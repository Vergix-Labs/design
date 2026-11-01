#!/usr/bin/env node
// Gera dist/tokens.css e dist/tokens.json a partir de src/tokens.json.
// Node puro, sem rede, deterministico (ordem estavel, sem data nem aleatoriedade).
//
// Uso: node scripts/build-tokens.mjs [dirSaida] [--src caminho/tokens.json]
//   dirSaida padrao: <pacote>/dist
//   --src padrao:    <pacote>/src/tokens.json
//
// Todo valor e provisorio ate o VRX-156 (DEC-344, DEC-348): o validador recusa
// token sem "provisional": true.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const VAR_PREFIX = '--vx-';
export const NAME_PATTERN = /^[a-z][a-z0-9]*(\.[a-z0-9]+)+$/;
export const THEME_PATTERN = /^[a-z][a-z0-9-]*$/;
const UNSAFE_VALUE = /[;{}\r\n]|\/\*|\*\//;

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/** Valida o documento. Devolve a lista de erros (vazia = valido). */
export function validate(doc) {
  const errors = [];
  if (!isObject(doc)) return ['o documento deve ser um objeto'];
  if (!isObject(doc.themes) || Object.keys(doc.themes).length === 0) {
    errors.push('"themes" deve ser um objeto com ao menos um tema');
    return errors;
  }
  if (typeof doc.defaultTheme !== 'string' || !(doc.defaultTheme in doc.themes)) {
    errors.push('"defaultTheme" deve nomear um tema existente em "themes"');
  }
  for (const [theme, tokens] of Object.entries(doc.themes)) {
    if (!THEME_PATTERN.test(theme)) errors.push(`nome de tema invalido: "${theme}"`);
    if (!isObject(tokens) || Object.keys(tokens).length === 0) {
      errors.push(`tema "${theme}" sem valores`);
      continue;
    }
    for (const [name, token] of Object.entries(tokens)) {
      const where = `${theme}/${name}`;
      if (!NAME_PATTERN.test(name)) errors.push(`${where}: nome fora do padrao semantico (ex.: color.text.default)`);
      if (!isObject(token)) { errors.push(`${where}: token deve ser um objeto {value, provisional}`); continue; }
      for (const k of Object.keys(token)) {
        if (k !== 'value' && k !== 'provisional') errors.push(`${where}: chave desconhecida "${k}"`);
      }
      if (typeof token.value !== 'string' || token.value.trim() === '') errors.push(`${where}: "value" deve ser texto nao vazio`);
      else if (UNSAFE_VALUE.test(token.value)) errors.push(`${where}: "value" tem caractere que quebraria o CSS`);
      if (token.provisional !== true) errors.push(`${where}: "provisional" deve ser true (todo valor e provisorio ate o VRX-156)`);
    }
  }
  return errors;
}

/** Forma canonica: chaves em ordem estavel, so value e provisional. */
export function canonicalize(doc) {
  const themes = {};
  for (const theme of Object.keys(doc.themes).sort()) {
    const tokens = doc.themes[theme];
    const names = Object.keys(tokens).sort();
    themes[theme] = {};
    for (const name of names) {
      themes[theme][name] = { provisional: true, value: tokens[name].value.trim() };
    }
  }
  return { defaultTheme: doc.defaultTheme, themes };
}

export const cssVarName = (name) => VAR_PREFIX + name.replace(/\./g, '-');

/** CSS: tema padrao em :root, os demais em [data-theme="nome"], um bloco por tema. */
export function renderCss(canon) {
  const order = [canon.defaultTheme, ...Object.keys(canon.themes).filter((t) => t !== canon.defaultTheme).sort()];
  const blocks = order.map((theme) => {
    const tokens = canon.themes[theme];
    const selector = theme === canon.defaultTheme ? ':root' : `[data-theme="${theme}"]`;
    const names = Object.keys(tokens).sort();
    const lines = names.map((name) => `  ${cssVarName(name)}: ${tokens[name].value};`);
    return `/* tema: ${theme} (valores provisorios) */\n${selector} {\n${lines.join('\n')}\n}\n`;
  });
  return `/* Gerado por scripts/build-tokens.mjs a partir de src/tokens.json. Nao editar. */\n/* Todo valor e provisorio ate o VRX-156. */\n\n${blocks.join('\n')}`;
}

export const renderJson = (canon) => `${JSON.stringify(canon, null, 2)}\n`;

/** Le a fonte, valida, e escreve dist. Devolve contagens. */
export function build(srcFile, outDir) {
  const doc = JSON.parse(readFileSync(srcFile, 'utf8'));
  const errors = validate(doc);
  if (errors.length > 0) {
    const err = new Error(`tokens invalidos (${errors.length}):\n  - ${errors.join('\n  - ')}`);
    err.validation = errors;
    throw err;
  }
  const canon = canonicalize(doc);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'tokens.css'), renderCss(canon));
  writeFileSync(join(outDir, 'tokens.json'), renderJson(canon));
  const themes = Object.keys(canon.themes).length;
  const tokens = Object.values(canon.themes).reduce((n, t) => n + Object.keys(t).length, 0);
  return { themes, tokens };
}

function main(argv) {
  const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  let src = join(pkgDir, 'src', 'tokens.json');
  let out = join(pkgDir, 'dist');
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--src') src = resolve(argv[++i] ?? '');
    else rest.push(argv[i]);
  }
  if (rest.length > 0) out = resolve(rest[0]);
  try {
    const { themes, tokens } = build(src, out);
    console.log(`build-tokens: ${tokens} tokens em ${themes} temas -> ${out}`);
  } catch (e) {
    console.error(`build-tokens: ${e.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
