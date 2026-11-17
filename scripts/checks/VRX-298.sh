#!/usr/bin/env bash
# VRX-298: estrutura do pacote @vergix-labs/design-tokens (JSON semantico -> CSS --vx-).
# Decisoes: DEC-344, DEC-348. "provisional" e booleano por token (true ou false) desde o VRX-301.
#
# Uso:  bash scripts/checks/VRX-298.sh              # DoD (a)-(f)
#       bash scripts/checks/VRX-298.sh --negative   # (g) controles negativos em copia
# Exit: 0 passou · 1 falhou (no --negative: 1 = mutantes detectados, o esperado)
#       3 desconhecido (node/git/origin/main/tmp indisponivel, controle positivo falhou).
# Somente leitura e teste local, sem rede. Bash 3.2 compativel (macOS).
set -euo pipefail

PKG_REL="packages/design-tokens"
BASE_REF="origin/main"   # base fixa e explicita do (f)

# PATHS permitidos (VRX-301, opcao A do 💬 75c703d3): o pacote inteiro + os 2 checkers.
# in_allowed (mais abaixo) aceita o prefixo packages/design-tokens/ e as duas igualdades exatas.

command -v node >/dev/null 2>&1 || { echo "DESCONHECIDO: node ausente"; exit 3; }
command -v git >/dev/null 2>&1 || { echo "DESCONHECIDO: git ausente"; exit 3; }
command -v shasum >/dev/null 2>&1 || { echo "DESCONHECIDO: shasum ausente"; exit 3; }
ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "DESCONHECIDO: fora de um repo git"; exit 3; }
[ -n "$ROOT" ] && [ -d "$ROOT" ] || { echo "DESCONHECIDO: raiz do repo invalida: '$ROOT'"; exit 3; }

TMP_BASE="${TMPDIR:-/Volumes/sanDiskPro/Developer/AgentWork/tmp}"
[ -d "$TMP_BASE" ] || { echo "DESCONHECIDO: diretorio temporario indisponivel: $TMP_BASE"; exit 3; }
# EXIT: remove o temporario sem alterar o exit code original (rm que falha nao muda o veredito).
WORK=""
cleanup() {
  local rc=$?
  trap - EXIT
  if [ -n "${WORK:-}" ]; then rm -rf "$WORK" || true; fi
  exit "$rc"
}
trap cleanup EXIT
MK=$(mktemp -d "${TMP_BASE%/}/vrx298.XXXXXX") || { echo "DESCONHECIDO: mktemp falhou"; exit 3; }
case "$MK" in "${TMP_BASE%/}"/vrx298.?*) ;; *) echo "DESCONHECIDO: mktemp devolveu caminho inesperado: '$MK'"; exit 3 ;; esac
[ -d "$MK" ] || { echo "DESCONHECIDO: mktemp nao criou o diretorio: $MK"; exit 3; }
WORK="$MK"
# teste de escrita ANTES da primeira escrita real
if ! ( : > "$WORK/.probe" ) 2>/dev/null; then echo "DESCONHECIDO: diretorio temporario sem permissao de escrita: $WORK"; exit 3; fi
rm -f "$WORK/.probe" || true
# Daqui em diante, qualquer erro nao tratado (em qualquer modo) e DESCONHECIDO (exit 3), nunca exit 1.
set -E
trap 'echo "DESCONHECIDO: erro interno (linha $LINENO)"; exit 3' ERR

FAIL=0
say_fail() { echo "FALHA: $*"; FAIL=1; }

# Verificador independente do gerador: le a fonte e a saida (dist) e confere (a), (c), (d).
# Nao importa codigo do pacote; o CSS e relido por parser proprio.
cat > "$WORK/verify.js" <<'EOF'
const fs = require('fs');
const path = require('path');
const [srcFile, distDir] = process.argv.slice(2);
const errors = [];
const fail = (m) => errors.push(m);
// Delimitadores do valor: devolve o motivo ou null (implementacao propria do verificador).
function badDelims(v) {
  const st = []; let q = null;
  for (const c of v) {
    if (c === '\\') return 'barra invertida';
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'") q = c;
    else if (c === '(' || c === '[') st.push(c);
    else if (c === ')' || c === ']') { const o = st.pop(); if (o !== (c === ')' ? '(' : '[')) return 'fechamento sem abertura'; }
  }
  if (q) return 'aspas sem par';
  if (st.length) return 'abertura sem fechamento';
  return null;
}
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
    const bd = badDelims(String(tok.value));
    if (bd) fail('valor com delimitadores desbalanceados (' + bd + ') em ' + t + '/' + n);
    if (typeof tok.provisional !== 'boolean') fail('token sem provisional booleano na fonte: ' + t + '/' + n); else srcProv++;
    if (block[v] === undefined) fail('round-trip: ' + t + '/' + n + ' nao reaparece no CSS como ' + v);
    else if (block[v] !== String(tok.value).trim()) fail('round-trip: ' + t + '/' + n + ' valor "' + tok.value + '" != CSS "' + block[v] + '"');
    else cssCount++;
    if (!dt[n]) fail('round-trip: ' + t + '/' + n + ' ausente em dist/tokens.json');
    else if (dt[n].value !== tok.value || dt[n].provisional !== tok.provisional) fail('dist/tokens.json diverge da fonte em ' + t + '/' + n);
    else distCount++;
  }
  for (const v of Object.keys(block)) if (!v.startsWith('--vx-')) fail('custom property sem prefixo --vx-: ' + v);
}
for (const sel of Object.keys(blocks)) for (const v of Object.keys(blocks[sel])) if (!v.startsWith('--vx-')) fail('custom property sem prefixo --vx-: ' + v);

console.log('fonte: ' + expected + ' tokens em ' + themes.length + ' temas; CSS confere: ' + cssCount + '; JSON confere: ' + distCount + '; provisional booleano: ' + srcProv);
if (expected === 0) fail('fonte sem tokens');
if (cssCount !== expected || distCount !== expected || srcProv !== expected) fail('contagem difere da fonte (esperado ' + expected + ')');
if (errors.length) { for (const e of errors) console.log('  ' + e); process.exit(1); }
EOF

# verify_dist <src.json> <dist-dir>
# 0 = confere (com a linha de resumo "fonte: ..."); 1 = reprovou; saida vazia/rc estranho = exit 3.
verify_dist() {
  local out rc=0
  out=$(trap - ERR; node "$WORK/verify.js" "$1" "$2" 2>&1) || rc=$?
  if [ -n "$out" ]; then printf '%s\n' "$out"; fi
  case "$rc" in
    0) case "$out" in "fonte: "*) return 0 ;; *) echo "DESCONHECIDO: verificador sem linha de resumo"; exit 3 ;; esac ;;
    1) # rc 1 so e "reprovou" se vier do proprio verificador (resumo ou erro conhecido); crash/saida estranha = exit 3
       case "$out" in
         *"fonte: "*|"fonte ilegivel"*|"dist/tokens.json ausente"*|"dist/tokens.css ausente"*) return 1 ;;
         *) echo "DESCONHECIDO: verificador falhou sem relatorio proprio"; exit 3 ;;
       esac ;;
    *) echo "DESCONHECIDO: verificador com rc inesperado ($rc)"; exit 3 ;;
  esac
}

# build_to <pacote> <src.json> <out-dir>
# rc 0 so vale se tokens.css e tokens.json existem e nao estao vazios (senao rc 3).
build_to() {
  local rc=0
  node "$1/scripts/build-tokens.mjs" "$3" --src "$2" || rc=$?
  if [ "$rc" -eq 0 ]; then
    if [ -s "$3/tokens.css" ] && [ -s "$3/tokens.json" ]; then return 0; fi
    echo "build-tokens (checker): sucesso sem saida em $3" >&2
    return 3
  fi
  return "$rc"
}

# shuffle_src <src.json> <dest.json>: mesma fonte com chaves em ordem inversa, em todos os niveis.
shuffle_src() {
  node -e '
    const fs = require("fs");
    const rev = (v) => (v && typeof v === "object" && !Array.isArray(v))
      ? Object.fromEntries(Object.keys(v).reverse().map((k) => [k, rev(v[k])])) : v;
    fs.writeFileSync(process.argv[2], JSON.stringify(rev(JSON.parse(fs.readFileSync(process.argv[1], "utf8"))), null, 2) + "\n");
  ' "$1" "$2"
}

# sha256_of <arquivo>: imprime o sha256 (64 hex) ou devolve 2. Saida ausente/malformada nunca vira "igual" nem "diferente".
sha256_of() {
  local h
  h=$(shasum -a 256 "$1" 2>/dev/null | awk '{print $1}') || return 2
  [ "${#h}" -eq 64 ] || return 2
  case "$h" in *[!0-9a-f]*) return 2 ;; esac
  printf '%s\n' "$h"
}

# order_independent <pacote> <src.json> <tag>: 0 = mesmo sha256 com a fonte embaralhada; 1 = difere; 2 = erro/saida invalida.
order_independent() {
  local f h1 h2
  shuffle_src "$2" "$WORK/$3.shuffled.json" || return 2
  build_to "$1" "$2" "$WORK/$3.o1" >/dev/null 2>&1 || return 2
  build_to "$1" "$WORK/$3.shuffled.json" "$WORK/$3.o2" >/dev/null 2>&1 || return 2
  for f in tokens.css tokens.json; do
    h1=$(sha256_of "$WORK/$3.o1/$f") || return 2
    h2=$(sha256_of "$WORK/$3.o2/$f") || return 2
    [ "$h1" = "$h2" ] || return 1
  done
  return 0
}

PKG="$ROOT/$PKG_REL"

if [ "${1:-}" = "--negative" ]; then
  # Erro interno (preparo de mutante, node, cp...) NUNCA vira exit 1: vira exit 3.
  # O unico exit 1 deste modo sai do ramo explicito "todos detectados" no fim.
  [ -f "$PKG/src/tokens.json" ] && [ -f "$PKG/scripts/build-tokens.mjs" ] || { echo "DESCONHECIDO: pacote ausente, nada a mutar"; exit 3; }
  COPY="$WORK/copy"
  mkdir -p "$COPY"
  cp -R "$PKG/src" "$PKG/scripts" "$PKG/test" "$PKG/package.json" "$COPY/"
  # controle positivo: a copia intacta tem de passar (e ser independente da ordem)
  build_to "$COPY" "$COPY/src/tokens.json" "$WORK/pos" >/dev/null 2>&1 || { echo "DESCONHECIDO: controle positivo: build da copia intacta falhou"; exit 3; }
  verify_dist "$COPY/src/tokens.json" "$WORK/pos" >/dev/null 2>&1 || { echo "DESCONHECIDO: controle positivo: copia intacta reprovada pelo verificador"; exit 3; }
  rc=0; order_independent "$COPY" "$COPY/src/tokens.json" pos || rc=$?
  [ "$rc" -eq 0 ] || { echo "DESCONHECIDO: controle positivo: copia intacta nao passa a prova de ordem (rc=$rc)"; exit 3; }
  echo "controle positivo: copia intacta passa no verificador e na prova de ordem"
  DETECTED=0; TOTAL=0

  # mutate_gen <dir> <ancora> <substituto> [all]: altera o gerador da copia; ancora ausente ou arquivo inalterado = exit 3.
  mutate_gen() {
    local f="$1/scripts/build-tokens.mjs" before after
    before=$(<"$f")
    node -e '
      const fs = require("fs"); const [f, a, b, all] = process.argv.slice(1);
      const s = fs.readFileSync(f, "utf8");
      if (!s.includes(a)) { console.error("ancora ausente: " + a); process.exit(7); }
      fs.writeFileSync(f, all === "all" ? s.split(a).join(b) : s.replace(a, b));
    ' "$f" "$2" "$3" "${4:-once}"
    after=$(<"$f")
    [ "$before" != "$after" ] || { echo "DESCONHECIDO: a mutacao nao alterou $f"; exit 3; }
  }
  # mutate_src <arquivo> <js>: aplica uma mutacao JS (variavel d = documento) na fonte; arquivo inalterado = exit 3.
  mutate_src() {
    local before after
    before=$(<"$1")
    node -e '
      const fs = require("fs"); const f = process.argv[1];
      const d = JSON.parse(fs.readFileSync(f, "utf8"));
      eval(process.argv[2]);
      fs.writeFileSync(f, JSON.stringify(d, null, 2) + "\n");
    ' "$1" "$2"
    after=$(<"$1")
    [ "$before" != "$after" ] || { echo "DESCONHECIDO: a mutacao nao alterou $1"; exit 3; }
  }
  # has <texto> <trecho>: 0 se o trecho aparece no texto (bash puro; nao depende de grep).
  has() { case "$1" in *"$2"*) return 0 ;; esac; return 1; }
  # Verificador: o log tem de trazer o resumo "fonte: ..." (erro inicial do verificador = ambiente quebrado).
  need_summary() { has "$2" 'fonte: ' || { echo "DESCONHECIDO: $1: verificador sem resumo (entrada ou saida invalida)"; exit 3; }; }
  # Gerador que recusou (rc 1) por razao diferente da esperada = ambiente/entrada quebrados, nao "mutante nao detectado".
  need_reason() { if [ "$2" -eq 1 ] && ! has "$3" "$4"; then echo "DESCONHECIDO: $1: o gerador falhou por razao inesperada"; exit 3; fi; }
  need_rc01() { case "$2" in 0|1) ;; *) echo "DESCONHECIDO: $1: rc inesperado ($2)"; exit 3 ;; esac; }
  # Um mutante so conta como detectado pela RAZAO esperada.
  detected() { echo "$1: detectado ($2)"; DETECTED=$((DETECTED + 1)); }
  missed() { echo "$1: NAO detectado ($2)"; }

  # M1: gerador descarta o ultimo token de cada tema -> o verificador reprova por contagem/token ausente
  TOTAL=$((TOTAL + 1))
  cp -R "$COPY" "$WORK/m1"
  mutate_gen "$WORK/m1" 'const names = Object.keys(tokens).sort();' 'const names = Object.keys(tokens).sort().slice(0, -1);'
  build_to "$WORK/m1" "$COPY/src/tokens.json" "$WORK/m1out" >/dev/null 2>&1 || { echo "DESCONHECIDO: M1: build do mutante falhou"; exit 3; }
  rc=0; verify_dist "$COPY/src/tokens.json" "$WORK/m1out" >"$WORK/m1.log" 2>&1 || rc=$?
  need_rc01 M1 "$rc"
  head -4 "$WORK/m1.log" | sed 's/^/    /'
  L=$(<"$WORK/m1.log")
  need_summary M1 "$L"
  if [ "$rc" -eq 1 ] && has "$L" 'declaracoes no CSS' && has "$L" 'nao reaparece no CSS'; then
    detected "M1 (gerador descarta o ultimo token)" "verificador: contagem e token ausente"
  else missed "M1 (gerador descarta o ultimo token)" "rc=$rc sem a razao esperada"; fi

  # M2: token removido da saida (dist/tokens.json e dist/tokens.css)
  TOTAL=$((TOTAL + 1))
  mkdir -p "$WORK/m2out"
  cp "$WORK/pos/tokens.json" "$WORK/pos/tokens.css" "$WORK/m2out/"
  node -e '
    const fs = require("fs"); const [i, o] = process.argv.slice(1);
    const kept = fs.readFileSync(i, "utf8").split("\n").filter((l) => !l.includes("--vx-color-text-default:"));
    fs.writeFileSync(o, kept.join("\n"));
  ' "$WORK/pos/tokens.css" "$WORK/m2out/tokens.css"
  A=$(<"$WORK/pos/tokens.css"); B=$(<"$WORK/m2out/tokens.css")
  [ "$A" != "$B" ] || { echo "DESCONHECIDO: M2: o mutante nao alterou o CSS"; exit 3; }
  mutate_src "$WORK/m2out/tokens.json" 'for (const t of Object.keys(d.themes)) delete d.themes[t]["color.text.default"];'
  rc=0; verify_dist "$COPY/src/tokens.json" "$WORK/m2out" >"$WORK/m2.log" 2>&1 || rc=$?
  need_rc01 M2 "$rc"
  head -4 "$WORK/m2.log" | sed 's/^/    /'
  L=$(<"$WORK/m2.log")
  need_summary M2 "$L"
  if [ "$rc" -eq 1 ] && has "$L" 'nao reaparece no CSS' && has "$L" 'ausente em dist/tokens.json'; then
    detected "M2 (token removido da saida)" "verificador: token ausente no CSS e no JSON"
  else missed "M2 (token removido da saida)" "rc=$rc sem a razao esperada"; fi

  # M3: fonte com um token sem provisional booleano -> o gerador recusa PELA razao "provisional"
  TOTAL=$((TOTAL + 1))
  cp -R "$COPY" "$WORK/m3"
  mutate_src "$WORK/m3/src/tokens.json" 'const t = Object.keys(d.themes)[0]; const n = Object.keys(d.themes[t])[0]; delete d.themes[t][n].provisional;'
  rc=0; build_to "$WORK/m3" "$WORK/m3/src/tokens.json" "$WORK/m3out" >"$WORK/m3.log" 2>&1 || rc=$?
  need_rc01 M3 "$rc"
  L=$(<"$WORK/m3.log")
  need_reason M3 "$rc" "$L" '"provisional" deve ser booleano'
  if [ "$rc" -eq 1 ] && has "$L" '"provisional" deve ser booleano'; then
    detected "M3 (token sem provisional)" "gerador recusou por provisional"
  else missed "M3 (token sem provisional)" "rc=$rc sem a razao esperada"; fi

  # M4: fonte com valor de delimitador desbalanceado -> o gerador recusa PELA razao "delimitador"
  TOTAL=$((TOTAL + 1))
  cp -R "$COPY" "$WORK/m4"
  mutate_src "$WORK/m4/src/tokens.json" 'const t = Object.keys(d.themes)[0]; d.themes[t][Object.keys(d.themes[t])[0]].value = "calc(1px";'
  rc=0; build_to "$WORK/m4" "$WORK/m4/src/tokens.json" "$WORK/m4out" >"$WORK/m4.log" 2>&1 || rc=$?
  need_rc01 M4 "$rc"
  L=$(<"$WORK/m4.log")
  need_reason M4 "$rc" "$L" 'delimitador invalido'
  if [ "$rc" -eq 1 ] && has "$L" 'delimitador invalido'; then
    detected "M4 (valor calc(1px desbalanceado)" "gerador recusou por delimitador"
  else missed "M4 (valor calc(1px desbalanceado)" "rc=$rc sem a razao esperada"; fi

  # M5: gerador SEM validacao + fonte desbalanceada -> o VERIFICADOR enxerga o CSS quebrado
  TOTAL=$((TOTAL + 1))
  cp -R "$COPY" "$WORK/m5"
  mutate_gen "$WORK/m5" 'const errors = validate(doc);' 'const errors = [];'
  build_to "$WORK/m5" "$WORK/m4/src/tokens.json" "$WORK/m5out" >/dev/null 2>&1 || { echo "DESCONHECIDO: M5: build do mutante falhou"; exit 3; }
  rc=0; verify_dist "$WORK/m4/src/tokens.json" "$WORK/m5out" >"$WORK/m5.log" 2>&1 || rc=$?
  need_rc01 M5 "$rc"
  head -3 "$WORK/m5.log" | sed 's/^/    /'
  L=$(<"$WORK/m5.log")
  need_summary M5 "$L"
  if [ "$rc" -eq 1 ] && has "$L" 'delimitadores desbalanceados'; then
    detected "M5 (sem validacao, calc(1px no CSS)" "verificador: delimitadores desbalanceados"
  else missed "M5 (sem validacao, calc(1px no CSS)" "rc=$rc sem a razao esperada"; fi

  # M6: gerador sem ordenacao -> idempotente, mas dependente da ordem da fonte; a prova de ordem detecta
  TOTAL=$((TOTAL + 1))
  cp -R "$COPY" "$WORK/m6"
  mutate_gen "$WORK/m6" '.sort()' '' all
  rc=0; order_independent "$WORK/m6" "$COPY/src/tokens.json" m6 || rc=$?
  case "$rc" in
    1) detected "M6 (gerador sem ordenacao)" "sha256 muda com a ordem da fonte" ;;
    0) missed "M6 (gerador sem ordenacao)" "a saida nao depende da ordem" ;;
    *) echo "DESCONHECIDO: M6: prova de ordem com erro interno (rc=$rc)"; exit 3 ;;
  esac

  echo "mutantes detectados: $DETECTED de $TOTAL"
  if [ "$DETECTED" -eq "$TOTAL" ]; then
    echo "NEGATIVO: todos os mutantes foram detectados pela razao esperada (exit 1 esperado)"
    trap - ERR
    exit 1
  fi
  echo "ATENCAO: instrumento cego para $((TOTAL - DETECTED)) mutante(s)"
  trap - ERR
  exit 0
fi

echo "== (a) build gera dist/tokens.css e dist/tokens.json com os tokens da fonte"
[ -f "$PKG/src/tokens.json" ] || say_fail "(a) $PKG_REL/src/tokens.json ausente"
[ -f "$PKG/scripts/build-tokens.mjs" ] || say_fail "(a) $PKG_REL/scripts/build-tokens.mjs ausente"
if [ "$FAIL" -eq 0 ]; then
  rc=0; build_to "$PKG" "$PKG/src/tokens.json" "$WORK/b1" >"$WORK/b1.log" 2>&1 || rc=$?
  cat "$WORK/b1.log"
  case "$rc" in
    0)
      rc=0; verify_dist "$PKG/src/tokens.json" "$WORK/b1" >"$WORK/v.log" 2>&1 || rc=$?
      cat "$WORK/v.log"
      if [ "$rc" -eq 0 ]; then
        echo "== (c) todo --vx-* e todo token com provisional booleano; (d) round-trip por tema: ok (mesmo verificador)"
      else
        say_fail "(a)(c)(d) verificador reprovou a saida"
      fi ;;
    1) # recusa do proprio gerador (mensagem "build-tokens: ...") e falha real; rc 1 sem mensagem = ferramenta quebrada
       L=$(<"$WORK/b1.log")
       case "$L" in "build-tokens: "*) say_fail "(a) o gerador recusou a fonte" ;; *) echo "DESCONHECIDO: (a) build falhou sem mensagem do gerador"; exit 3 ;; esac ;;
    *) echo "DESCONHECIDO: (a) build com rc inesperado ($rc)"; exit 3 ;;
  esac
fi

echo "== (b) dois builds seguidos: mesmo sha256"
if [ "$FAIL" -eq 0 ]; then
  build_to "$PKG" "$PKG/src/tokens.json" "$WORK/b2" >/dev/null 2>&1 || { echo "DESCONHECIDO: (b) segundo build falhou apos o primeiro passar"; exit 3; }
  for f in tokens.css tokens.json; do
    S1=$(sha256_of "$WORK/b1/$f") || { echo "DESCONHECIDO: sha256 de b1/$f indisponivel"; exit 3; }
    S2=$(sha256_of "$WORK/b2/$f") || { echo "DESCONHECIDO: sha256 de b2/$f indisponivel"; exit 3; }
    echo "  $f: $S1 / $S2"
    [ "$S1" = "$S2" ] || say_fail "(b) $f difere entre dois builds"
  done
  echo "== (b2) independencia de ordem: fonte com chaves embaralhadas gera o mesmo sha256"
  rc=0; order_independent "$PKG" "$PKG/src/tokens.json" main || rc=$?
  case "$rc" in
    0) echo "  sha256 igual com a fonte embaralhada" ;;
    1) say_fail "(b2) a saida depende da ordem das chaves da fonte" ;;
    2) echo "DESCONHECIDO: (b2) erro interno na prova de ordem"; exit 3 ;;
    *) say_fail "(b2) rc inesperado na prova de ordem (rc=$rc)" ;;
  esac
fi

echo "== (e) a marca anterior nao aparece em nenhum arquivo"
P="ara""teko"
if [ -d "$PKG" ]; then
  FILES=$(find "$PKG" -type f) || { echo "DESCONHECIDO: (e) find falhou"; exit 3; }
  EXPECTED=1   # o proprio checker
  while IFS= read -r line; do [ -z "$line" ] || EXPECTED=$((EXPECTED + 1)); done <<EOF
$FILES
EOF
  # grep -c: rc 0 = ha ocorrencia, 1 = nenhuma (legitimo), >=2 = erro. Erro nunca vira "zero".
  rc=0; COUNTS=$(trap - ERR; grep -r -i -c "$P" "$PKG" "$ROOT/scripts/checks/VRX-298.sh" 2>/dev/null) || rc=$?
  case "$rc" in 0|1) ;; *) echo "DESCONHECIDO: (e) grep falhou (rc=$rc)"; exit 3 ;; esac
  NFILES=0; NONZERO=0
  while IFS= read -r line; do
    [ -n "$line" ] || continue
    case "$line" in *:[0-9]*) ;; *) echo "DESCONHECIDO: (e) saida do grep fora do formato: '$line'"; exit 3 ;; esac
    n=${line##*:}
    case "$n" in ''|*[!0-9]*) echo "DESCONHECIDO: (e) contagem invalida: '$line'"; exit 3 ;; esac
    NFILES=$((NFILES + 1))
    if [ "$n" -ne 0 ]; then NONZERO=$((NONZERO + 1)); fi
  done <<EOF
$COUNTS
EOF
  echo "  arquivos varridos: $NFILES (esperado $EXPECTED); com ocorrencia: $NONZERO"
  [ "$NFILES" -eq "$EXPECTED" ] || { echo "DESCONHECIDO: (e) o grep nao varreu todos os arquivos"; exit 3; }
  if [ "$rc" -eq 0 ] && [ "$NONZERO" -eq 0 ]; then echo "DESCONHECIDO: (e) rc do grep e as contagens discordam"; exit 3; fi
  if [ "$rc" -eq 1 ] && [ "$NONZERO" -ne 0 ]; then echo "DESCONHECIDO: (e) rc do grep e as contagens discordam"; exit 3; fi
  [ "$NONZERO" -eq 0 ] || say_fail "(e) ocorrencia da marca anterior"
else
  say_fail "(e) $PKG_REL ausente"
fi

echo "== (f) git diff --name-only --no-renames $BASE_REF contido nos PATHS"
BASE_SHA=$(git -C "$ROOT" rev-parse --verify -q "$BASE_REF^{commit}") || { echo "DESCONHECIDO: $BASE_REF nao resolve"; exit 3; }
[ "${#BASE_SHA}" -eq 40 ] || { echo "DESCONHECIDO: sha de $BASE_REF invalido: '$BASE_SHA'"; exit 3; }
case "$BASE_SHA" in *[!0-9a-f]*) echo "DESCONHECIDO: sha de $BASE_REF invalido: '$BASE_SHA'"; exit 3 ;; esac
echo "  base: $BASE_REF = $BASE_SHA"
DIFF_NAMES=$(git -C "$ROOT" diff --name-only --no-renames "$BASE_SHA") || { echo "DESCONHECIDO: git diff contra $BASE_REF falhou"; exit 3; }
UNTRACKED=$(git -C "$ROOT" ls-files --others --exclude-standard) || { echo "DESCONHECIDO: git ls-files falhou"; exit 3; }
# contraprova independente: `git diff --quiet` (0 = sem diferenca, 1 = ha diferenca) tem de concordar com a lista de nomes
rc=0; git -C "$ROOT" diff --quiet --no-renames "$BASE_SHA" || rc=$?
case "$rc" in
  0) [ -z "$DIFF_NAMES" ] || { echo "DESCONHECIDO: (f) git diff --quiet diz 'sem diferenca' mas a lista de nomes nao e vazia"; exit 3; } ;;
  1) [ -n "$DIFF_NAMES" ] || { echo "DESCONHECIDO: (f) git diff --quiet diz 'ha diferenca' mas a lista de nomes e vazia"; exit 3; } ;;
  *) echo "DESCONHECIDO: (f) git diff --quiet rc inesperado ($rc)"; exit 3 ;;
esac
# contraprova de untracked: `git status --porcelain -uall` (linhas "?? ") tem de concordar com `ls-files --others`
STATUS=$(git -C "$ROOT" status --porcelain -uall) || { echo "DESCONHECIDO: (f) git status falhou"; exit 3; }
NU_LS=0; NU_ST=0
while IFS= read -r l; do [ -z "$l" ] || NU_LS=$((NU_LS + 1)); done <<EOF
$UNTRACKED
EOF
while IFS= read -r l; do case "$l" in "?? "*) NU_ST=$((NU_ST + 1)) ;; esac; done <<EOF
$STATUS
EOF
[ "$NU_LS" -eq "$NU_ST" ] || { echo "DESCONHECIDO: (f) untracked: ls-files ($NU_LS) e status ($NU_ST) discordam"; exit 3; }
in_allowed() {
  case "$1" in
    packages/design-tokens/?*|scripts/checks/VRX-298.sh|scripts/checks/VRX-301.sh) return 0 ;;
  esac
  return 1
}
OUT=0; NCH=0
while IFS= read -r f; do
  [ -n "$f" ] || continue
  NCH=$((NCH + 1))
  if ! in_allowed "$f"; then echo "  fora dos PATHS: $f"; OUT=$((OUT + 1)); fi
done <<EOF
$DIFF_NAMES
$UNTRACKED
EOF
echo "  arquivos alterados: $NCH; fora dos PATHS: $OUT"
[ "$OUT" -eq 0 ] || say_fail "(f) $OUT arquivo(s) fora dos PATHS"

if [ "$FAIL" -eq 0 ]; then echo "OK: VRX-298 atendido"; exit 0; fi
echo "FALHOU: VRX-298"; exit 1
