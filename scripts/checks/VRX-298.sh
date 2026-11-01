#!/usr/bin/env bash
# VRX-298: estrutura do pacote @vergix-labs/design-tokens (JSON semantico -> CSS --vx-).
# Decisoes: DEC-344, DEC-348. Todo valor e provisorio ate o VRX-156.
#
# Uso:  bash scripts/checks/VRX-298.sh              # DoD (a)-(f)
#       bash scripts/checks/VRX-298.sh --negative   # (g) controles negativos em copia
# Exit: 0 passou · 1 falhou (no --negative: 1 = mutantes detectados, o esperado)
#       3 desconhecido (node/git/origin/main/tmp indisponivel, controle positivo falhou).
# Somente leitura e teste local, sem rede. Bash 3.2 compativel (macOS).
set -euo pipefail

PKG_REL="packages/design-tokens"

# PATHS permitidos do ticket (um por linha, igualdade exata).
ALLOWED='packages/design-tokens/package.json
packages/design-tokens/README.md
packages/design-tokens/.gitignore
packages/design-tokens/src/tokens.json
packages/design-tokens/scripts/build-tokens.mjs
packages/design-tokens/test/build-tokens.test.mjs
scripts/checks/VRX-298.sh'

command -v node >/dev/null 2>&1 || { echo "DESCONHECIDO: node ausente"; exit 3; }
command -v git >/dev/null 2>&1 || { echo "DESCONHECIDO: git ausente"; exit 3; }
command -v shasum >/dev/null 2>&1 || { echo "DESCONHECIDO: shasum ausente"; exit 3; }
ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "DESCONHECIDO: fora de um repo git"; exit 3; }

TMP_BASE="${TMPDIR:-/Volumes/sanDiskPro/Developer/AgentWork/tmp}"
[ -d "$TMP_BASE" ] || { echo "DESCONHECIDO: diretorio temporario indisponivel: $TMP_BASE"; exit 3; }
WORK=$(mktemp -d "${TMP_BASE%/}/vrx298.XXXXXX") || { echo "DESCONHECIDO: mktemp falhou"; exit 3; }
trap 'rm -rf "$WORK"' EXIT

FAIL=0
say_fail() { echo "FALHA: $*"; FAIL=1; }

# Verificador independente do gerador: le a fonte e a saida (dist) e confere (a), (c), (d).
# Nao importa codigo do pacote; o CSS e relido por parser proprio.
cat > "$WORK/verify.js" <<'EOF'
const fs = require('fs');
const path = require('path');
const [srcFile, distDir] = process.argv.slice(1);
const errors = [];
const fail = (m) => errors.push(m);
let src, dist, css;
try { src = JSON.parse(fs.readFileSync(srcFile, 'utf8')); } catch (e) { console.log('fonte ilegivel: ' + e.message); process.exit(1); }
try { dist = JSON.parse(fs.readFileSync(path.join(distDir, 'tokens.json'), 'utf8')); } catch (e) { console.log('dist/tokens.json ausente ou invalido: ' + e.message); process.exit(1); }
try { css = fs.readFileSync(path.join(distDir, 'tokens.css'), 'utf8'); } catch (e) { console.log('dist/tokens.css ausente: ' + e.message); process.exit(1); }

const themes = Object.keys(src.themes || {});
let expected = 0;
for (const t of themes) expected += Object.keys(src.themes[t]).length;

// blocos do CSS: seletor -> { variavel: valor }
const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
const blocks = {};
const re = /([^{}]+)\{([^}]*)\}/g;
let m;
while ((m = re.exec(noComments)) !== null) {
  const sel = m[1].trim();
  if (blocks[sel]) fail('seletor repetido no CSS: ' + sel);
  const decls = {};
  for (const raw of m[2].split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const d = /^(--[^:\s]+):\s*(.*);$/.exec(line);
    if (!d) { fail('linha de bloco nao e declaracao: ' + line); continue; }
    if (decls[d[1]] !== undefined) fail('variavel repetida em ' + sel + ': ' + d[1]);
    decls[d[1]] = d[2];
  }
  blocks[sel] = decls;
}
const resto = noComments.replace(re, '').trim();
if (resto) fail('texto fora de blocos no CSS: ' + resto.slice(0, 60));

if (Object.keys(blocks).length !== themes.length) fail('blocos no CSS (' + Object.keys(blocks).length + ') != temas na fonte (' + themes.length + ')');
if (!dist.themes || Object.keys(dist.themes).length !== themes.length) fail('temas em dist/tokens.json != fonte');

let cssCount = 0, distCount = 0, srcProv = 0;
for (const t of themes) {
  const sel = t === src.defaultTheme ? ':root' : '[data-theme="' + t + '"]';
  const block = blocks[sel];
  if (!block) { fail('sem bloco CSS para o tema ' + t + ' (' + sel + ')'); continue; }
  const names = Object.keys(src.themes[t]);
  if (Object.keys(block).length !== names.length) fail('tema ' + t + ': ' + Object.keys(block).length + ' declaracoes no CSS, ' + names.length + ' tokens na fonte');
  const dt = (dist.themes || {})[t] || {};
  if (Object.keys(dt).length !== names.length) fail('tema ' + t + ': ' + Object.keys(dt).length + ' tokens no dist/tokens.json, ' + names.length + ' na fonte');
  for (const n of names) {
    const tok = src.themes[t][n];
    const v = '--vx-' + n.replace(/\./g, '-');
    if (tok.provisional !== true) fail('token sem provisional:true na fonte: ' + t + '/' + n); else srcProv++;
    if (block[v] === undefined) fail('round-trip: ' + t + '/' + n + ' nao reaparece no CSS como ' + v);
    else if (block[v] !== String(tok.value).trim()) fail('round-trip: ' + t + '/' + n + ' valor "' + tok.value + '" != CSS "' + block[v] + '"');
    else cssCount++;
    if (!dt[n]) fail('round-trip: ' + t + '/' + n + ' ausente em dist/tokens.json');
    else if (dt[n].value !== tok.value || dt[n].provisional !== true) fail('dist/tokens.json diverge da fonte em ' + t + '/' + n);
    else distCount++;
  }
  for (const v of Object.keys(block)) if (!v.startsWith('--vx-')) fail('custom property sem prefixo --vx-: ' + v);
}
for (const sel of Object.keys(blocks)) for (const v of Object.keys(blocks[sel])) if (!v.startsWith('--vx-')) fail('custom property sem prefixo --vx-: ' + v);

console.log('fonte: ' + expected + ' tokens em ' + themes.length + ' temas; CSS confere: ' + cssCount + '; JSON confere: ' + distCount + '; provisional:true: ' + srcProv);
if (expected === 0) fail('fonte sem tokens');
if (cssCount !== expected || distCount !== expected || srcProv !== expected) fail('contagem difere da fonte (esperado ' + expected + ')');
if (errors.length) { for (const e of errors) console.log('  ' + e); process.exit(1); }
EOF

# verify_dist <src.json> <dist-dir>
verify_dist() { node "$WORK/verify.js" "$1" "$2"; }

# build_to <pacote> <src.json> <out-dir>
build_to() { node "$1/scripts/build-tokens.mjs" "$3" --src "$2"; }

PKG="$ROOT/$PKG_REL"

if [ "${1:-}" = "--negative" ]; then
  [ -f "$PKG/src/tokens.json" ] && [ -f "$PKG/scripts/build-tokens.mjs" ] || { echo "DESCONHECIDO: pacote ausente, nada a mutar"; exit 3; }
  COPY="$WORK/copy"
  mkdir -p "$COPY"
  cp -R "$PKG/src" "$PKG/scripts" "$PKG/test" "$PKG/package.json" "$COPY/"
  # controle positivo: a copia intacta tem de passar
  if ! build_to "$COPY" "$COPY/src/tokens.json" "$WORK/pos" >/dev/null 2>&1 || ! verify_dist "$COPY/src/tokens.json" "$WORK/pos"; then
    echo "DESCONHECIDO: controle positivo falhou (copia intacta nao passa); mutantes nao sao interpretaveis"; exit 3
  fi
  echo "controle positivo: copia intacta passa no verificador"
  DETECTED=0; TOTAL=0

  # M1: gerador descarta o ultimo token de cada tema
  cp -R "$COPY" "$WORK/m1"
  node -e '
    const fs = require("fs"); const f = process.argv[1];
    const s = fs.readFileSync(f, "utf8");
    const a = "const names = Object.keys(tokens).sort();";
    if (!s.includes(a)) process.exit(7);
    fs.writeFileSync(f, s.replace(a, "const names = Object.keys(tokens).sort().slice(0, -1);"));
  ' "$WORK/m1/scripts/build-tokens.mjs" || { echo "DESCONHECIDO: ancora do mutante M1 nao encontrada no gerador"; exit 3; }
  TOTAL=$((TOTAL + 1))
  if build_to "$WORK/m1" "$WORK/m1/src/tokens.json" "$WORK/m1out" >/dev/null 2>&1 && verify_dist "$COPY/src/tokens.json" "$WORK/m1out" >"$WORK/m1.log" 2>&1; then
    echo "M1 (gerador descarta o ultimo token): NAO detectado"
  else
    echo "M1 (gerador descarta o ultimo token): detectado"; sed 's/^/    /' "$WORK/m1.log" 2>/dev/null | head -4 || true; DETECTED=$((DETECTED + 1))
  fi

  # M2: um token removido do dist/tokens.json e do dist/tokens.css gerados
  mkdir -p "$WORK/m2out"
  cp "$WORK/pos/tokens.json" "$WORK/pos/tokens.css" "$WORK/m2out/"
  grep -v -e '--vx-color-text-default:' "$WORK/pos/tokens.css" > "$WORK/m2out/tokens.css" || true
  node -e '
    const fs = require("fs"); const f = process.argv[1];
    const d = JSON.parse(fs.readFileSync(f, "utf8"));
    for (const t of Object.keys(d.themes)) delete d.themes[t]["color.text.default"];
    fs.writeFileSync(f, JSON.stringify(d, null, 2) + "\n");
  ' "$WORK/m2out/tokens.json"
  TOTAL=$((TOTAL + 1))
  if verify_dist "$COPY/src/tokens.json" "$WORK/m2out" >"$WORK/m2.log" 2>&1; then
    echo "M2 (token removido da saida): NAO detectado"
  else
    echo "M2 (token removido da saida): detectado"; sed 's/^/    /' "$WORK/m2.log" | head -4 || true; DETECTED=$((DETECTED + 1))
  fi

  # M3: fonte com um token sem provisional -> o gerador tem de recusar (exit != 0)
  cp -R "$COPY" "$WORK/m3"
  node -e '
    const fs = require("fs"); const f = process.argv[1];
    const d = JSON.parse(fs.readFileSync(f, "utf8"));
    const t = Object.keys(d.themes)[0]; const n = Object.keys(d.themes[t])[0];
    delete d.themes[t][n].provisional;
    fs.writeFileSync(f, JSON.stringify(d, null, 2) + "\n");
  ' "$WORK/m3/src/tokens.json"
  TOTAL=$((TOTAL + 1))
  if build_to "$WORK/m3" "$WORK/m3/src/tokens.json" "$WORK/m3out" >/dev/null 2>&1; then
    echo "M3 (token sem provisional): NAO detectado (o gerador aceitou)"
  else
    echo "M3 (token sem provisional): detectado (o gerador recusou)"; DETECTED=$((DETECTED + 1))
  fi

  echo "mutantes detectados: $DETECTED de $TOTAL"
  if [ "$DETECTED" -eq "$TOTAL" ]; then
    echo "NEGATIVO: todos os mutantes foram detectados (exit 1 esperado)"
    exit 1
  fi
  echo "ATENCAO: instrumento cego para $((TOTAL - DETECTED)) mutante(s)"
  exit 0
fi

echo "== (a) build gera dist/tokens.css e dist/tokens.json com os tokens da fonte"
[ -f "$PKG/src/tokens.json" ] || say_fail "(a) $PKG_REL/src/tokens.json ausente"
[ -f "$PKG/scripts/build-tokens.mjs" ] || say_fail "(a) $PKG_REL/scripts/build-tokens.mjs ausente"
if [ "$FAIL" -eq 0 ]; then
  if build_to "$PKG" "$PKG/src/tokens.json" "$WORK/b1" >"$WORK/b1.log" 2>&1; then
    cat "$WORK/b1.log"
    if verify_dist "$PKG/src/tokens.json" "$WORK/b1" >"$WORK/v.log" 2>&1; then
      cat "$WORK/v.log"
      echo "== (c) todo --vx-* e todo token com provisional:true; (d) round-trip por tema: ok (mesmo verificador)"
    else
      cat "$WORK/v.log"; say_fail "(a)(c)(d) verificador reprovou a saida"
    fi
  else
    cat "$WORK/b1.log"; say_fail "(a) o build falhou"
  fi
fi

echo "== (b) dois builds seguidos: mesmo sha256"
if [ "$FAIL" -eq 0 ]; then
  build_to "$PKG" "$PKG/src/tokens.json" "$WORK/b2" >/dev/null 2>&1 || say_fail "(b) segundo build falhou"
  for f in tokens.css tokens.json; do
    S1=$(shasum -a 256 "$WORK/b1/$f" | awk '{print $1}')
    S2=$(shasum -a 256 "$WORK/b2/$f" | awk '{print $1}')
    echo "  $f: $S1 / $S2"
    [ "$S1" = "$S2" ] || say_fail "(b) $f difere entre dois builds"
  done
fi

echo "== (e) a marca anterior nao aparece em nenhum arquivo"
P="ara""teko"
if [ -d "$PKG" ]; then
  COUNTS=$(grep -r -i -c "$P" "$PKG" "$ROOT/scripts/checks/VRX-298.sh" 2>/dev/null || true)
  NFILES=$(printf '%s\n' "$COUNTS" | grep -c . || true)
  NONZERO=$(printf '%s\n' "$COUNTS" | grep -v -e ':0$' | grep -c . || true)
  echo "  arquivos varridos: $NFILES; com ocorrencia: $NONZERO"
  [ "$NFILES" -gt 0 ] || say_fail "(e) nada varrido"
  [ "$NONZERO" -eq 0 ] || say_fail "(e) ocorrencia da marca anterior"
else
  say_fail "(e) $PKG_REL ausente"
fi

echo "== (f) git diff --name-only origin/main contido nos PATHS"
git -C "$ROOT" rev-parse --verify -q origin/main >/dev/null || { echo "DESCONHECIDO: origin/main ausente"; exit 3; }
CHANGED=$( { git -C "$ROOT" diff --name-only origin/main; git -C "$ROOT" ls-files --others --exclude-standard; } | sort -u )
OUT=0
while IFS= read -r f; do
  [ -n "$f" ] || continue
  if ! printf '%s\n' "$ALLOWED" | grep -qxF -e "$f"; then echo "  fora dos PATHS: $f"; OUT=$((OUT + 1)); fi
done <<EOF
$CHANGED
EOF
NCH=$(printf '%s\n' "$CHANGED" | grep -c . || true)
echo "  arquivos alterados: $NCH; fora dos PATHS: $OUT"
[ "$OUT" -eq 0 ] || say_fail "(f) $OUT arquivo(s) fora dos PATHS"

if [ "$FAIL" -eq 0 ]; then echo "OK: VRX-298 atendido"; exit 0; fi
echo "FALHOU: VRX-298"; exit 1
