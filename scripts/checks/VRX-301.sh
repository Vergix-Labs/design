#!/usr/bin/env bash
# VRX-301: DS v0.1.0 do @vergix-labs/design-tokens (valores reais, tema Noite, fontes).
# Decisoes: DEC-344, DEC-347, DEC-348. A paleta e rascunho de agente (V1 D-ii).
#
# Uso:  bash scripts/checks/VRX-301.sh              # DoD
#       bash scripts/checks/VRX-301.sh --negative   # controle negativo: mutantes em copia
# Exit: 0 passou (no --negative: TODOS os mutantes foram detectados, o esperado)
#       1 falhou (no --negative: algum mutante NAO foi detectado)
#       3 desconhecido (node/git/shasum/tmp indisponivel, controle positivo falhou).
# DoD, nessa ordem, com falha fechada:
#   (1) node --test do pacote  (2) build deterministico (dois builds, mesmo sha256)
#   (3) grep -c '"provisional": true' src/tokens.json = 0
#   (4) paridade de chaves light/dark  (5) contraste >= 4,5:1 texto/fundo nos dois temas
#   (6) fontes woff2 + licenca das 3 familias  (7) package.json 0.1.0/private false
#   (8) bash scripts/checks/VRX-298.sh exit 0
# Somente leitura e teste local, sem rede. Fixtures sinteticas (mutantes em copia temporaria).
set -euo pipefail

PKG_REL="packages/design-tokens"
TEST_FILES="test/build-tokens.test.mjs test/design-system.test.mjs"

command -v node >/dev/null 2>&1 || { echo "DESCONHECIDO: node ausente"; exit 3; }
command -v git >/dev/null 2>&1 || { echo "DESCONHECIDO: git ausente"; exit 3; }
command -v shasum >/dev/null 2>&1 || command -v sha256sum >/dev/null 2>&1 || { echo "DESCONHECIDO: shasum/sha256sum ausente"; exit 3; }
ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "DESCONHECIDO: fora de um repo git"; exit 3; }
[ -n "$ROOT" ] && [ -d "$ROOT/$PKG_REL" ] || { echo "DESCONHECIDO: pacote ausente em '$ROOT/$PKG_REL'"; exit 3; }
PKG="$ROOT/$PKG_REL"

TMP_BASE="${TMPDIR:-/tmp}"
[ -d "$TMP_BASE" ] || { echo "DESCONHECIDO: diretorio temporario indisponivel: $TMP_BASE"; exit 3; }
export TMPDIR="$TMP_BASE"   # o node --test e o VRX-298.sh herdam um tmp valido
WORK=""
cleanup() { local rc=$?; trap - EXIT; if [ -n "${WORK:-}" ]; then rm -rf "$WORK" || true; fi; exit "$rc"; }
trap cleanup EXIT
WORK=$(mktemp -d "${TMP_BASE%/}/vrx301.XXXXXX") || { echo "DESCONHECIDO: mktemp falhou"; exit 3; }
case "$WORK" in "${TMP_BASE%/}"/vrx301.?*) ;; *) echo "DESCONHECIDO: mktemp devolveu caminho inesperado: '$WORK'"; exit 3 ;; esac
set -E
trap 'echo "DESCONHECIDO: erro interno (linha $LINENO)"; exit 3' ERR

FAIL=0
say_fail() { echo "FALHA: $*"; FAIL=1; }
has() { case "$1" in *"$2"*) return 0 ;; esac; return 1; }
sha_of() {
  local h
  if command -v shasum >/dev/null 2>&1; then h=$(shasum -a 256 "$1" | awk '{print $1}'); else h=$(sha256sum "$1" | awk '{print $1}'); fi
  [ "${#h}" -eq 64 ] || { echo "DESCONHECIDO: sha256 invalido para $1"; exit 3; }
  printf '%s\n' "$h"
}

# Verificador estatico, independente do gerador: le o pacote (dir) e confere (3)-(7).
# Cada falha imprime uma linha "FALHA[<classe>]: ..."; a ultima linha e "RESUMO: ok|falhou".
cat > "$WORK/static.js" <<'EOF'
const fs = require('fs');
const path = require('path');
const pkg = process.argv[2];
const errors = [];
const fail = (cls, m) => errors.push('FALHA[' + cls + ']: ' + m);
const readJson = (f, cls) => { try { return JSON.parse(fs.readFileSync(path.join(pkg, f), 'utf8')); } catch (e) { fail(cls, f + ' ilegivel: ' + e.message); return null; } };

const tokens = readJson('src/tokens.json', 'fonte');
const fonts = readJson('src/fonts.json', 'fonte');
const pj = readJson('package.json', 'pacote');

// (3) nenhum provisional true (e todo token tem provisional false, para um arquivo vazio nao passar)
if (tokens) {
  const raw = fs.readFileSync(path.join(pkg, 'src/tokens.json'), 'utf8');
  const nTrue = (raw.match(/"provisional": true/g) || []).length;
  if (nTrue !== 0) fail('provisional', nTrue + ' ocorrencia(s) de "provisional": true');
  let total = 0, nFalse = 0;
  for (const t of Object.values(tokens.themes || {})) for (const tok of Object.values(t)) { total++; if (tok.provisional === false) nFalse++; }
  if (total === 0 || nFalse !== total) fail('provisional', 'tokens com provisional false: ' + nFalse + ' de ' + total);

  // (4) paridade de chaves
  const th = tokens.themes || {};
  if (!th.light || !th.dark) fail('paridade', 'faltam os temas light e dark');
  else {
    const a = Object.keys(th.light), b = Object.keys(th.dark);
    const onlyL = a.filter((k) => !(k in th.dark)), onlyD = b.filter((k) => !(k in th.light));
    if (onlyL.length || onlyD.length) fail('paridade', 'so no light: [' + onlyL.join(', ') + '] so no dark: [' + onlyD.join(', ') + ']');

    // (5) contraste texto principal x fundo, nos dois temas (implementacao propria)
    const lum = (hex) => {
      const m = /^#([0-9a-f]{6})$/i.exec(hex || '');
      if (!m) return null;
      const [r, g, bl] = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
      return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
    };
    for (const theme of ['light', 'dark']) {
      for (const bg of ['color.surface.page', 'color.surface.raised']) {
        const fg = th[theme] && th[theme]['color.text.default'], back = th[theme] && th[theme][bg];
        const l1 = fg && lum(fg.value), l2 = back && lum(back.value);
        if (l1 == null || l2 == null) { fail('contraste', theme + ': cor ausente ou invalida em text.default/' + bg); continue; }
        const c = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        if (c < 4.5) fail('contraste', theme + ': text.default x ' + bg + ' = ' + c.toFixed(2) + ' (< 4.5)');
      }
    }
  }
}

// (6) fontes: 3 familias, woff2 de verdade, licenca OFL ao lado
for (const slug of ['spectral', 'hanken-grotesk', 'spline-sans-mono']) {
  const dir = path.join(pkg, 'fonts', slug);
  if (!fs.existsSync(dir)) { fail('woff2', 'pasta ausente: fonts/' + slug); continue; }
  const woff2 = fs.readdirSync(dir).filter((f) => f.endsWith('.woff2'));
  if (woff2.length === 0) fail('woff2', 'sem woff2 em fonts/' + slug);
  for (const f of woff2) if (fs.readFileSync(path.join(dir, f)).subarray(0, 4).toString('latin1') !== 'wOF2') fail('woff2', 'magic invalido: fonts/' + slug + '/' + f);
  const lic = path.join(dir, 'OFL.txt');
  if (!fs.existsSync(lic)) fail('licenca', 'licenca ausente: fonts/' + slug + '/OFL.txt');
  else if (!/SIL OPEN FONT LICENSE Version 1\.1/.test(fs.readFileSync(lic, 'utf8'))) fail('licenca', 'fonts/' + slug + '/OFL.txt nao e a OFL 1.1');
}
if (fonts && Array.isArray(fonts.faces)) for (const f of fonts.faces) if (!fs.existsSync(path.join(pkg, 'fonts', f.file))) fail('woff2', 'fonts.json aponta para arquivo ausente: ' + f.file);

// (7) package.json
if (pj) {
  if (pj.version !== '0.1.0') fail('pacote', 'version ' + pj.version + ' != 0.1.0');
  if (pj.private !== false) fail('pacote', 'private deve ser false');
  for (const f of ['dist/tokens.css', 'dist/tokens.json', 'dist/fonts.css', 'fonts/**']) if (!(pj.files || []).includes(f)) fail('pacote', 'files sem ' + f);
  for (const k of ['./tokens.css', './tokens.json', './fonts.css', './fonts/*']) if (!(pj.exports || {})[k]) fail('pacote', 'exports sem ' + k);
}
if (!fs.existsSync(path.join(pkg, 'CHANGELOG.md')) || !/^## \[0\.1\.0\]/m.test(fs.readFileSync(path.join(pkg, 'CHANGELOG.md'), 'utf8'))) fail('pacote', 'CHANGELOG.md sem a entrada 0.1.0');

for (const e of errors) console.log(e);
console.log('RESUMO: ' + (errors.length ? 'falhou' : 'ok'));
process.exit(errors.length ? 1 : 0);
EOF

# static_check <pkg-dir>: 0 ok · 1 reprovou (saida em $WORK/static.out) · 3 verificador quebrado
static_check() {
  local rc=0
  node "$WORK/static.js" "$1" >"$WORK/static.out" 2>&1 || rc=$?
  case "$rc" in
    0) has "$(<"$WORK/static.out")" 'RESUMO: ok' || { echo "DESCONHECIDO: verificador estatico sem resumo"; exit 3; }; return 0 ;;
    1) has "$(<"$WORK/static.out")" 'RESUMO: falhou' || { echo "DESCONHECIDO: verificador estatico falhou sem relatorio"; exit 3; }; return 1 ;;
    *) echo "DESCONHECIDO: verificador estatico com rc inesperado ($rc)"; exit 3 ;;
  esac
}

# suite_in <pkg-dir>: roda o node --test do pacote naquela raiz; devolve o rc do node (0 = verde).
suite_in() {
  local rc=0 f files=()
  for f in $TEST_FILES; do files+=("$1/$f"); done
  node --test "${files[@]}" >"$WORK/suite.out" 2>&1 || rc=$?
  return "$rc"
}

if [ "${1:-}" = "--negative" ]; then
  COPY="$WORK/copy"
  mkdir -p "$COPY"
  cp -R "$PKG/src" "$PKG/fonts" "$PKG/scripts" "$PKG/test" "$PKG/package.json" "$PKG/CHANGELOG.md" "$COPY/"
  # controle positivo: a copia intacta passa no verificador estatico e na suite
  static_check "$COPY" || { echo "DESCONHECIDO: controle positivo: copia intacta reprovada"; cat "$WORK/static.out"; exit 3; }
  rc=0; suite_in "$COPY" || rc=$?
  [ "$rc" -eq 0 ] || { echo "DESCONHECIDO: controle positivo: suite na copia intacta falhou (rc=$rc)"; tail -20 "$WORK/suite.out"; exit 3; }
  echo "controle positivo: copia intacta passa no verificador estatico e na suite"

  DETECTED=0; TOTAL=0
  # mutate <rotulo> <classe-esperada> <comando-js-ou-sh>: aplica o mutante em copia nova, exige:
  #   (a) o verificador estatico reprovar PELA classe esperada; (b) a suite node --test falhar.
  run_mutant() {
    local label="$1" cls="$2" dir="$WORK/m$((TOTAL + 1))" out ok_static=0 ok_suite=0 rc=0
    TOTAL=$((TOTAL + 1))
    cp -R "$COPY" "$dir"
    mutate "$dir" "$3"
    # a mutacao tem de ter mudado algo
    if diff -rq "$COPY" "$dir" >/dev/null 2>&1; then echo "DESCONHECIDO: $label: a mutacao nao alterou nada"; exit 3; fi
    rc=0; static_check "$dir" || rc=$?
    out=$(<"$WORK/static.out")
    if [ "$rc" -eq 1 ] && has "$out" "FALHA[$cls]"; then ok_static=1; fi
    rc=0; suite_in "$dir" || rc=$?
    case "$rc" in 0) ok_suite=0 ;; *) ok_suite=1 ;; esac
    if [ "$ok_static" -eq 1 ] && [ "$ok_suite" -eq 1 ]; then
      echo "$label: detectado (estatico: classe $cls; suite: falhou)"; DETECTED=$((DETECTED + 1))
    else
      echo "$label: NAO detectado (estatico pela classe $cls: $ok_static; suite falhou: $ok_suite)"
    fi
  }
  # mutate <dir> <nome>: mutantes nomeados (copia ja feita).
  mutate() {
    local d="$1"
    case "$2" in
      provisional)  # um token provisorio reintroduzido
        node -e 'const fs=require("fs");const f=process.argv[1];const d=JSON.parse(fs.readFileSync(f,"utf8"));const n=Object.keys(d.themes.dark)[0];d.themes.dark[n].provisional=true;fs.writeFileSync(f,JSON.stringify(d,null,2)+"\n")' "$d/src/tokens.json" ;;
      darkonly)     # uma chave so no dark
        node -e 'const fs=require("fs");const f=process.argv[1];const d=JSON.parse(fs.readFileSync(f,"utf8"));d.themes.dark["color.extra.apenasdark"]={value:"#123456",provisional:false};fs.writeFileSync(f,JSON.stringify(d,null,2)+"\n")' "$d/src/tokens.json" ;;
      license)      # uma licenca removida
        rm "$d/fonts/spectral/OFL.txt" ;;
      contrast)     # texto escuro sem contraste com o fundo escuro
        node -e 'const fs=require("fs");const f=process.argv[1];const d=JSON.parse(fs.readFileSync(f,"utf8"));d.themes.dark["color.text.default"].value="#2a313b";fs.writeFileSync(f,JSON.stringify(d,null,2)+"\n")' "$d/src/tokens.json" ;;
      woff2)        # woff2 de uma familia removidos
        rm "$d"/fonts/hanken-grotesk/*.woff2 ;;
      pkgprivate)   # pacote volta a private true
        node -e 'const fs=require("fs");const f=process.argv[1];const p=JSON.parse(fs.readFileSync(f,"utf8"));p.private=true;fs.writeFileSync(f,JSON.stringify(p,null,2)+"\n")' "$d/package.json" ;;
      *) echo "DESCONHECIDO: mutante $2 desconhecido"; exit 3 ;;
    esac
  }
  run_mutant "M1 (token provisorio reintroduzido no dark)" provisional provisional
  run_mutant "M2 (chave so no dark)" paridade darkonly
  run_mutant "M3 (licenca da Spectral removida)" licenca license
  run_mutant "M4 (contraste do texto escuro abaixo de 4,5)" contraste contrast
  run_mutant "M5 (woff2 da Hanken Grotesk removidos)" woff2 woff2
  run_mutant "M6 (package.json com private true)" pacote pkgprivate

  echo "mutantes detectados: $DETECTED de $TOTAL"
  if [ "$DETECTED" -eq "$TOTAL" ]; then
    echo "NEGATIVO: todos os mutantes foram detectados (exit 0 esperado)"
    exit 0
  fi
  echo "FALHA: instrumento cego para $((TOTAL - DETECTED)) mutante(s)"
  trap - ERR
  exit 1
fi

echo "== (1) node --test do pacote"
rc=0; suite_in "$PKG" || rc=$?
tail -n 9 "$WORK/suite.out" | grep -E '^# (tests|pass|fail|skipped)' || true
[ "$rc" -eq 0 ] || say_fail "(1) node --test falhou (rc=$rc)"
T=$(grep -E '^# tests ' "$WORK/suite.out" | awk '{print $3}' || true)
case "$T" in ''|*[!0-9]*) echo "DESCONHECIDO: (1) contagem de testes ilegivel"; exit 3 ;; esac
[ "$T" -ge 18 ] || say_fail "(1) menos de 18 testes ($T)"

echo "== (2) build deterministico: dois builds, mesmo sha256"
for i in 1 2; do node "$PKG/scripts/build-tokens.mjs" "$WORK/b$i" >/dev/null 2>&1 || { say_fail "(2) build $i falhou"; break; }; done
if [ -s "$WORK/b1/tokens.css" ] && [ -s "$WORK/b2/tokens.css" ]; then
  for f in tokens.css tokens.json fonts.css; do
    [ -s "$WORK/b1/$f" ] && [ -s "$WORK/b2/$f" ] || { say_fail "(2) $f ausente ou vazio"; continue; }
    S1=$(sha_of "$WORK/b1/$f"); S2=$(sha_of "$WORK/b2/$f")
    echo "  $f: $S1 / $S2"
    [ "$S1" = "$S2" ] || say_fail "(2) $f difere entre dois builds"
  done
else
  say_fail "(2) build sem tokens.css"
fi

echo "== (3)-(7) provisional = 0 · paridade light/dark · contraste · fontes + licencas · package.json"
NTRUE=0; rc=0
NTRUE=$(trap - ERR; grep -c '"provisional": true' "$PKG/src/tokens.json") || rc=$?
case "$rc" in 0|1) ;; *) echo "DESCONHECIDO: (3) grep falhou (rc=$rc)"; exit 3 ;; esac
echo "  \$ grep -c '\"provisional\": true' $PKG_REL/src/tokens.json -> $NTRUE"
[ "$NTRUE" -eq 0 ] || say_fail "(3) $NTRUE ocorrencia(s) de provisional true"
if static_check "$PKG"; then cat "$WORK/static.out"; else cat "$WORK/static.out"; FAIL=1; fi

echo "== (8) VRX-298.sh continua exit 0"
rc=0; bash "$ROOT/scripts/checks/VRX-298.sh" >"$WORK/298.out" 2>&1 || rc=$?
tail -n 3 "$WORK/298.out"
echo "  VRX-298.sh -> exit $rc"
case "$rc" in 0) ;; 3) echo "DESCONHECIDO: (8) VRX-298.sh devolveu 3"; exit 3 ;; *) say_fail "(8) VRX-298.sh exit $rc" ;; esac

if [ "$FAIL" -eq 0 ]; then echo "OK: VRX-301 atendido"; exit 0; fi
echo "FALHOU: VRX-301"; trap - ERR; exit 1
