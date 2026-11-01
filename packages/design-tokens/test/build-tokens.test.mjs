import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const pkgDir = resolve(here, '..');
const script = join(pkgDir, 'scripts', 'build-tokens.mjs');
const srcFile = join(pkgDir, 'src', 'tokens.json');
const source = JSON.parse(readFileSync(srcFile, 'utf8'));

const scratch = mkdtempSync(join(process.env.TMPDIR || tmpdir(), 'vx-tokens-test-'));
let seq = 0;
const fresh = (label) => { const d = join(scratch, `${label}-${seq++}`); mkdirSync(d, { recursive: true }); return d; };

function run(outDir, src = srcFile) {
  return spawnSync(process.execPath, [script, outDir, '--src', src], { encoding: 'utf8' });
}
function buildOk(label, src = srcFile) {
  const out = fresh(label);
  const r = run(out, src);
  assert.equal(r.status, 0, r.stderr);
  return { out, css: readFileSync(join(out, 'tokens.css'), 'utf8'), json: readFileSync(join(out, 'tokens.json'), 'utf8') };
}
function writeSrc(label, doc) {
  const f = join(fresh(label), 'tokens.json');
  writeFileSync(f, JSON.stringify(doc, null, 2));
  return f;
}
const clone = (o) => JSON.parse(JSON.stringify(o));

// Parser de CSS independente do gerador: seletor -> {variavel: valor}
function parseCss(css) {
  const blocks = {};
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of stripped.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const decls = {};
    for (const line of m[2].split('\n')) {
      const d = /^\s*(--[^:\s]+):\s*(.*);\s*$/.exec(line);
      if (d) decls[d[1]] = d[2];
    }
    blocks[m[1].trim()] = decls;
  }
  return blocks;
}
const selectorOf = (theme) => (theme === source.defaultTheme ? ':root' : `[data-theme="${theme}"]`);
const countSource = () => Object.values(source.themes).reduce((n, t) => n + Object.keys(t).length, 0);

test('a fonte tem tema padrao, ao menos dois temas e so tokens provisorios', () => {
  assert.ok(source.defaultTheme in source.themes);
  assert.ok(Object.keys(source.themes).length >= 2);
  for (const tokens of Object.values(source.themes)) {
    for (const t of Object.values(tokens)) assert.equal(t.provisional, true);
  }
});

test('contagem: dist tem exatamente os tokens da fonte (contagem calculada)', () => {
  const { css, json } = buildOk('count');
  const blocks = parseCss(css);
  const expected = countSource();
  assert.ok(expected > 0);
  const inCss = Object.values(blocks).reduce((n, b) => n + Object.keys(b).length, 0);
  const dist = JSON.parse(json);
  const inJson = Object.values(dist.themes).reduce((n, t) => n + Object.keys(t).length, 0);
  assert.equal(inCss, expected);
  assert.equal(inJson, expected);
  assert.equal(Object.keys(blocks).length, Object.keys(source.themes).length);
});

test('determinismo: dois builds geram bytes identicos', () => {
  const a = buildOk('det-a');
  const b = buildOk('det-b');
  assert.equal(a.css, b.css);
  assert.equal(a.json, b.json);
});

test('saida estavel: a ordem das chaves da fonte nao altera a saida', () => {
  const shuffled = { defaultTheme: source.defaultTheme, themes: {} };
  for (const theme of Object.keys(source.themes).reverse()) {
    shuffled.themes[theme] = {};
    for (const name of Object.keys(source.themes[theme]).reverse()) shuffled.themes[theme][name] = source.themes[theme][name];
  }
  const a = buildOk('order-a');
  const b = buildOk('order-b', writeSrc('order-src', shuffled));
  assert.equal(a.css, b.css);
  assert.equal(a.json, b.json);
});

test('prefixo: toda custom property comeca com --vx-', () => {
  const { css } = buildOk('prefix');
  const vars = [...css.matchAll(/^\s*(--[^:\s]+):/gm)].map((m) => m[1]);
  assert.ok(vars.length > 0);
  for (const v of vars) assert.ok(v.startsWith('--vx-'), v);
});

test('provisional: todo token do dist/tokens.json e provisional true', () => {
  const dist = JSON.parse(buildOk('prov').json);
  for (const tokens of Object.values(dist.themes)) {
    for (const t of Object.values(tokens)) assert.equal(t.provisional, true);
  }
});

test('tema padrao em :root e os demais em [data-theme="..."]', () => {
  const blocks = parseCss(buildOk('sel').css);
  for (const theme of Object.keys(source.themes)) assert.ok(selectorOf(theme) in blocks, selectorOf(theme));
  assert.ok(':root' in blocks);
});

test('round-trip: cada token reaparece com o mesmo valor no CSS e no JSON, em cada tema', () => {
  const { css, json } = buildOk('rt');
  const blocks = parseCss(css);
  const dist = JSON.parse(json);
  for (const [theme, tokens] of Object.entries(source.themes)) {
    for (const [name, t] of Object.entries(tokens)) {
      const v = `--vx-${name.replace(/\./g, '-')}`;
      assert.equal(blocks[selectorOf(theme)][v], t.value, `${theme}/${name} no CSS`);
      assert.equal(dist.themes[theme][name].value, t.value, `${theme}/${name} no JSON`);
    }
  }
});

test('o controle e discriminante: um valor alterado na fonte muda o CSS gerado', () => {
  const doc = clone(source);
  const name = Object.keys(doc.themes.light)[0];
  doc.themes.light[name].value = '#010203';
  const mutated = parseCss(buildOk('disc', writeSrc('disc-src', doc)).css);
  const original = parseCss(buildOk('disc-orig').css);
  const v = `--vx-${name.replace(/\./g, '-')}`;
  assert.equal(mutated[':root'][v], '#010203');
  assert.notEqual(original[':root'][v], '#010203');
});

test('recusa: token sem provisional', () => {
  const doc = clone(source);
  delete doc.themes.light[Object.keys(doc.themes.light)[0]].provisional;
  const r = run(fresh('rej-prov'), writeSrc('rej-prov-src', doc));
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /provisional/);
});

test('recusa: provisional diferente de true', () => {
  const doc = clone(source);
  doc.themes.light[Object.keys(doc.themes.light)[0]].provisional = false;
  assert.notEqual(run(fresh('rej-false'), writeSrc('rej-false-src', doc)).status, 0);
});

test('recusa: nome fora do padrao semantico', () => {
  for (const bad of ['Color.Text', 'color', 'color-text-default', 'color..x', '1color.text', 'color.text_default']) {
    const doc = clone(source);
    doc.themes.light[bad] = { value: '#000000', provisional: true };
    const r = run(fresh('rej-name'), writeSrc('rej-name-src', doc));
    assert.notEqual(r.status, 0, bad);
    assert.match(r.stderr, /nome fora do padrao/, bad);
  }
});

test('recusa: tema sem valores', () => {
  const doc = clone(source);
  doc.themes.dark = {};
  const r = run(fresh('rej-empty'), writeSrc('rej-empty-src', doc));
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /sem valores/);
});

test('recusa: defaultTheme inexistente e valor que quebraria o CSS', () => {
  const a = clone(source);
  a.defaultTheme = 'nao-existe';
  assert.notEqual(run(fresh('rej-def'), writeSrc('rej-def-src', a)).status, 0);
  const b = clone(source);
  b.themes.light[Object.keys(b.themes.light)[0]].value = 'red; } body { display: none';
  assert.notEqual(run(fresh('rej-inj'), writeSrc('rej-inj-src', b)).status, 0);
});

test('recusa: JSON malformado e recusa nao deixa dist parcial', () => {
  const f = join(fresh('rej-json'), 'tokens.json');
  writeFileSync(f, '{ "themes": ');
  const out = fresh('rej-json-out');
  const r = run(out, f);
  assert.notEqual(r.status, 0);
  assert.throws(() => readFileSync(join(out, 'tokens.css')));
});
