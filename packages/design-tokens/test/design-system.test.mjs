// Contrato do DS v0.1.0 (VRX-301): valores reais, paridade light/dark, contraste, fontes e pacote.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (f) => JSON.parse(readFileSync(join(pkgDir, f), 'utf8'));
const source = readJson('src/tokens.json');
const fonts = readJson('src/fonts.json');
const pkg = readJson('package.json');
const themes = Object.keys(source.themes);

function build(label) {
  const out = mkdtempSync(join(process.env.TMPDIR || tmpdir(), `vx-ds-${label}-`));
  const r = spawnSync(process.execPath, [join(pkgDir, 'scripts', 'build-tokens.mjs'), out], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  return out;
}

// Contraste WCAG 2.x, implementacao propria (independente do gerador).
function luminance(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  assert.ok(m, `cor hex de 6 digitos esperada, veio "${hex}"`);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
const val = (theme, name) => source.themes[theme][name].value;

test('nenhum token provisorio: provisional false em todos, nos dois temas', () => {
  assert.deepEqual(themes.sort(), ['dark', 'light']);
  assert.equal(source.defaultTheme, 'light');
  let n = 0;
  for (const theme of themes) {
    for (const [name, t] of Object.entries(source.themes[theme])) {
      assert.equal(t.provisional, false, `${theme}/${name}`);
      n++;
    }
  }
  assert.ok(n >= 100, `tokens contados: ${n}`);
  assert.equal(JSON.stringify(source).includes('"provisional": true'), false);
});

test('light e dark tem exatamente o mesmo conjunto de chaves', () => {
  const a = Object.keys(source.themes.light).sort();
  const b = Object.keys(source.themes.dark).sort();
  assert.deepEqual(a, b);
  // controle: o tema escuro difere do claro nas cores (nao e copia)
  for (const name of ['color.text.default', 'color.surface.page', 'color.accent.default']) {
    assert.notEqual(val('light', name), val('dark', name), name);
  }
});

test('cobertura semantica: texto, fundo, superficie, borda, acento, estados, foco, tipografia, espaco, raio, sombra, duracao', () => {
  const names = Object.keys(source.themes.light);
  const has = (prefix) => assert.ok(names.some((n) => n.startsWith(prefix)), prefix);
  for (const p of ['color.text.', 'color.surface.', 'color.border.', 'color.accent.', 'color.success.', 'color.warning.', 'color.error.', 'color.info.', 'color.focus.', 'font.family.', 'font.size.', 'font.weight.', 'font.lineheight.', 'space.', 'radius.', 'shadow.', 'duration.']) has(p);
});

test('contraste >= 4,5:1: texto principal x fundo, nos dois temas', () => {
  for (const theme of themes) {
    for (const bg of ['color.surface.page', 'color.surface.raised']) {
      const c = contrast(val(theme, 'color.text.default'), val(theme, bg));
      assert.ok(c >= 4.5, `${theme}: text.default x ${bg} = ${c.toFixed(2)}`);
    }
  }
});

test('contraste >= 4,5:1: pares de apoio (muted, subtle, link, acento, estados) nos dois temas', () => {
  const surfaces = ['color.surface.page', 'color.surface.raised', 'color.surface.hover', 'color.surface.selected', 'color.accent.subtle',
    ...['success', 'warning', 'error', 'info'].map((s) => `color.${s}.surface`)];
  const base = surfaces.slice(0, 5);
  for (const theme of themes) {
    const pairs = [
      // texto de leitura sobre toda superficie (incl. as de estado e a selecionada)
      ...['color.text.default', 'color.text.muted', 'color.text.subtle'].flatMap((fg) => surfaces.map((bg) => [fg, bg])),
      // texto de estado sobre as superficies base e sobre a propria superficie de estado
      ...['success', 'warning', 'error', 'info'].flatMap((s) => [...base.map((bg) => [`color.${s}.text`, bg]), [`color.${s}.text`, `color.${s}.surface`]]),
      ['color.link.default', 'color.surface.page'], ['color.link.default', 'color.surface.raised'],
      ['color.accent.contrast', 'color.accent.default'], ['color.accent.contrast', 'color.accent.hover'],
      ['color.text.inverse', 'color.surface.inverse'], ['color.link.inverse', 'color.surface.inverse'],
    ];
    for (const [fg, bg] of pairs) {
      const c = contrast(val(theme, fg), val(theme, bg));
      assert.ok(c >= 4.5, `${theme}: ${fg} x ${bg} = ${c.toFixed(2)}`);
    }
  }
});

test('o medidor de contraste e discriminante: reprova um par ruim conhecido e acerta um valor de referencia', () => {
  assert.ok(contrast('#777777', '#808080') < 4.5);
  assert.ok(Math.abs(contrast('#000000', '#ffffff') - 21) < 1e-9);
  assert.ok(Math.abs(contrast('#767676', '#ffffff') - 4.54) < 0.01);
});

test('fontes: 3 familias com woff2 (magic wOF2) e licenca OFL ao lado', () => {
  const dirs = { Spectral: 'spectral', 'Hanken Grotesk': 'hanken-grotesk', 'Spline Sans Mono': 'spline-sans-mono' };
  for (const [family, slug] of Object.entries(dirs)) {
    const dir = join(pkgDir, 'fonts', slug);
    assert.ok(existsSync(dir), `${dir} ausente`);
    const files = readdirSync(dir);
    const woff2 = files.filter((f) => f.endsWith('.woff2'));
    assert.ok(woff2.length >= 1, `${family}: sem woff2`);
    for (const f of woff2) assert.equal(readFileSync(join(dir, f)).subarray(0, 4).toString('latin1'), 'wOF2', `${slug}/${f}`);
    const lic = join(dir, 'OFL.txt');
    assert.ok(existsSync(lic) && statSync(lic).size > 1000, `${family}: licenca ausente ou vazia`);
    assert.match(readFileSync(lic, 'utf8'), /SIL OPEN FONT LICENSE Version 1\.1/, `${family}: OFL 1.1`);
    assert.ok(fonts.faces.some((f) => f.family === family), `${family} nao esta em fonts.json`);
  }
});

test('fonts.json: todo arquivo existe e fonts.css tem um @font-face por face', () => {
  for (const f of fonts.faces) assert.ok(existsSync(join(pkgDir, 'fonts', f.file)), f.file);
  const css = readFileSync(join(build('fonts'), 'fonts.css'), 'utf8');
  assert.equal((css.match(/@font-face/g) || []).length, fonts.faces.length);
  for (const f of fonts.faces) assert.ok(css.includes(`url("../fonts/${f.file}")`), f.file);
});

test('os tokens de tipografia referenciam as 3 familias das fontes', () => {
  const fam = (n) => val('light', n);
  assert.match(fam('font.family.serif'), /^"Spectral"/);
  assert.match(fam('font.family.sans'), /^"Hanken Grotesk"/);
  assert.match(fam('font.family.mono'), /^"Spline Sans Mono"/);
  for (const theme of themes) for (const n of ['font.family.serif', 'font.family.sans', 'font.family.mono', 'font.family.base']) assert.equal(val(theme, n), fam(n));
});

test('determinismo: dois builds geram o mesmo dist (tokens.css, tokens.json, fonts.css)', () => {
  const a = build('det-a');
  const b = build('det-b');
  for (const f of ['tokens.css', 'tokens.json', 'fonts.css']) assert.equal(readFileSync(join(a, f), 'utf8'), readFileSync(join(b, f), 'utf8'), f);
});

test('package.json: version 0.1.0, private false, files e exports apontam para o que o build gera', () => {
  assert.equal(pkg.version, '0.1.0');
  assert.equal(pkg.private, false);
  assert.equal(pkg.name, '@vergix-labs/design-tokens');
  for (const f of ['dist/tokens.css', 'dist/tokens.json', 'dist/fonts.css', 'fonts/**']) assert.ok(pkg.files.includes(f), f);
  for (const k of ['./tokens.css', './tokens.json', './fonts.css', './fonts/*']) assert.ok(k in pkg.exports, k);
  const out = build('exports');
  for (const f of ['tokens.css', 'tokens.json', 'fonts.css']) assert.ok(existsSync(join(out, f)), f);
});

test('CHANGELOG tem a entrada 0.1.0', () => {
  assert.match(readFileSync(join(pkgDir, 'CHANGELOG.md'), 'utf8'), /^## \[0\.1\.0\]/m);
});

test('gerador recusa face de fonte invalida', () => {
  const dir = mkdtempSync(join(process.env.TMPDIR || tmpdir(), 'vx-ds-badfont-'));
  const w = (f, o) => spawnSync('node', ['-e', 'require("fs").writeFileSync(process.argv[1], process.argv[2])', join(dir, f), JSON.stringify(o)]);
  w('tokens.json', source);
  w('fonts.json', { faces: [{ family: 'X', weight: 400, style: 'normal', file: '../etc/passwd' }] });
  const r = spawnSync(process.execPath, [join(pkgDir, 'scripts', 'build-tokens.mjs'), join(dir, 'out'), '--src', join(dir, 'tokens.json')], { encoding: 'utf8' });
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /fontes invalidas/);
});
