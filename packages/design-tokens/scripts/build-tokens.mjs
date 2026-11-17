#!/usr/bin/env node
// Gera dist/tokens.css, dist/tokens.json e (se src/fonts.json existir ao lado da
// fonte) dist/fonts.css a partir de src/tokens.json.
// Node puro, sem rede, deterministico (ordem estavel, sem data nem aleatoriedade).
//
// Uso: node scripts/build-tokens.mjs [dirSaida] [--src caminho/tokens.json]
//   dirSaida padrao: <pacote>/dist
//   --src padrao:    <pacote>/src/tokens.json
//
// Cada token carrega "provisional" booleano (DEC-344, DEC-348): true = valor ainda
// nao decidido, false = valor decidido. O validador recusa qualquer outra coisa.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const VAR_PREFIX = '--vx-';
export const NAME_PATTERN = /^[a-z][a-z0-9]*(\.[a-z0-9]+)+$/;
export const THEME_PATTERN = /^[a-z][a-z0-9-]*$/;
const UNSAFE_VALUE = /[;{}\r\n]|\/\*|\*\//;

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/**
 * Delimitadores do valor: devolve o motivo da recusa ou null.
 * Recusa barra invertida, aspas sem par e parenteses/colchetes desbalanceados.
 */
export function delimiterProblem(value) {
  const closers = { ')': '(', ']': '[' };
  const stack = [];
  let quote = null;
  for (const ch of value) {
    if (ch === '\\') return 'barra invertida nao e aceita';
    if (quote) { if (ch === quote) quote = null; continue; }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(' || ch === '[') stack.push(ch);
    else if (ch === ')' || ch === ']') {
      if (stack.pop() !== closers[ch]) return `"${ch}" sem abertura correspondente`;
    }
  }
  if (quote) return 'aspas sem par';
  if (stack.length > 0) return `"${stack[stack.length - 1]}" sem fechamento`;
  return null;
}

/** Valida o documento. Devolve a lista de erros (vazia = valido). */
export function validate(doc) {
  const errors = [];
  if (!isObject(doc)) return ['o documento deve ser um objeto'];
  if (!isObject(doc.themes) || Object.keys(doc.themes).length === 0) {
    errors.push('"themes" deve ser um objeto com ao menos um tema');
    return errors;
  }
  if (typeof doc.defaultTheme !== 'string' || !Object.hasOwn(doc.themes, doc.defaultTheme)) {
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
      else {
        const problem = delimiterProblem(token.value);
        if (problem) errors.push(`${where}: "value" com delimitador invalido (${problem})`);
      }
      if (typeof token.provisional !== 'boolean') errors.push(`${where}: "provisional" deve ser booleano (true ou false)`);
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
      themes[theme][name] = { provisional: tokens[name].provisional, value: tokens[name].value.trim() };
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
    return `/* tema: ${theme} */\n${selector} {\n${lines.join('\n')}\n}\n`;
  });
  return `/* Gerado por scripts/build-tokens.mjs a partir de src/tokens.json. Nao editar. */\n\n${blocks.join('\n')}`;
}

export const renderJson = (canon) => `${JSON.stringify(canon, null, 2)}\n`;

// Fontes: src/fonts.json lista as faces (woff2 em fonts/<familia>/). Subconjunto latin.
export const FACE_FILE = /^[a-z0-9-]+\/[a-z0-9-]+\.woff2$/;
export const LATIN_RANGE = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';

/** Valida src/fonts.json. Devolve a lista de erros. */
export function validateFonts(doc) {
  const errors = [];
  if (!isObject(doc) || !Array.isArray(doc.faces) || doc.faces.length === 0) return ['fonts.json: "faces" deve ser uma lista nao vazia'];
  doc.faces.forEach((f, i) => {
    const where = `fonts.json faces[${i}]`;
    if (!isObject(f)) { errors.push(`${where}: deve ser um objeto`); return; }
    if (typeof f.family !== 'string' || !/^[A-Za-z][A-Za-z0-9 ]*$/.test(f.family)) errors.push(`${where}: "family" invalida`);
    if (!Number.isInteger(f.weight) || f.weight < 100 || f.weight > 900) errors.push(`${where}: "weight" deve ser inteiro de 100 a 900`);
    if (f.style !== 'normal' && f.style !== 'italic') errors.push(`${where}: "style" deve ser normal ou italic`);
    if (typeof f.file !== 'string' || !FACE_FILE.test(f.file)) errors.push(`${where}: "file" deve ser <familia>/<arquivo>.woff2`);
  });
  return errors;
}

/** fonts.css: um @font-face por face, ordem estavel; urls relativas a dist/ (../fonts/...). */
export function renderFontsCss(doc) {
  const faces = [...doc.faces].sort((a, b) => a.family.localeCompare(b.family) || a.weight - b.weight || a.style.localeCompare(b.style));
  const blocks = faces.map((f) => `@font-face {\n  font-family: "${f.family}";\n  font-style: ${f.style};\n  font-weight: ${f.weight};\n  font-display: swap;\n  src: url("../fonts/${f.file}") format("woff2");\n  unicode-range: ${LATIN_RANGE};\n}\n`);
  return `/* Gerado por scripts/build-tokens.mjs a partir de src/fonts.json. Nao editar. */\n\n${blocks.join('\n')}`;
}

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
  const fontsFile = join(dirname(srcFile), 'fonts.json');
  let fontsDoc = null;
  if (existsSync(fontsFile)) {
    fontsDoc = JSON.parse(readFileSync(fontsFile, 'utf8'));
    const fontErrors = validateFonts(fontsDoc);
    if (fontErrors.length > 0) {
      const err = new Error(`fontes invalidas (${fontErrors.length}):\n  - ${fontErrors.join('\n  - ')}`);
      err.validation = fontErrors;
      throw err;
    }
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'tokens.css'), renderCss(canon));
  writeFileSync(join(outDir, 'tokens.json'), renderJson(canon));
  if (fontsDoc) writeFileSync(join(outDir, 'fonts.css'), renderFontsCss(fontsDoc));
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
