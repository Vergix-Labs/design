#!/usr/bin/env bash
# VRX-299 (parte 2): a main do Vergix-Labs/design nao carrega mais o wireframe legado
# nem o que o publica. Decisoes: DEC-344, DEC-348. Conteudo antigo: tag `legacy-arateko`.
#
# Uso:  bash scripts/checks/VRX-299.sh              # DoD (a)-(d)
#       bash scripts/checks/VRX-299.sh --negative   # (e) controle negativo em copia
# Exit: 0 passou · 1 falhou · 3 desconhecido (git/rede/origin/main indisponivel).
# Somente leitura e teste local. Unica rede: `git ls-remote` da tag.
# Bash 3.2 compativel (macOS).
set -euo pipefail

TAG_SHA="3e1e1734517c30ffb2890598f82268e0a8e5d005"
REMOTE_URL="https://github.com/Vergix-Labs/design.git"

# Wireframe + publicacao (removidos). Um por linha.
WIREFRAME="wrangler.jsonc
uploads
components
guidelines
ui_kits
tokens
assets
index.html
styles.css
_ds_bundle.js
_ds_manifest.json
_adherence.oxlintrc.json
SKILL.md"

# PATHS permitidos do ticket (padroes de `case`; `*` cruza `/`).
ALLOWED='wrangler.jsonc
uploads/*
components/*
guidelines/*
ui_kits/*
tokens/*
assets/*
index.html
styles.css
_ds_bundle.js
_ds_manifest.json
_adherence.oxlintrc.json
SKILL.md
README.md
AGENTS.md
scripts/checks/VRX-299.sh'

ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "DESCONHECIDO: fora de um repo git"; exit 3; }
FAIL=0
say_fail() { echo "FALHA: $*"; FAIL=1; }

# (a) em HEAD de <repo> nao existe nenhum item do wireframe. Retorna numero de itens presentes.
check_a_in() {
  local repo="$1" n=0 p
  while IFS= read -r p; do
    [ -n "$p" ] || continue
    if [ -n "$(git -C "$repo" ls-tree HEAD -- "$p")" ]; then
      echo "  presente em HEAD: $p"
      n=$((n + 1))
    fi
  done <<EOF
$WIREFRAME
EOF
  return "$n"
}

# (e) controle negativo: copia de HEAD + wrangler.jsonc restaurado de origin/main; (a) tem de falhar.
if [ "${1:-}" = "--negative" ]; then
  git -C "$ROOT" rev-parse --verify -q origin/main >/dev/null || { echo "DESCONHECIDO: origin/main ausente"; exit 3; }
  TMP_BASE="${TMPDIR:-/Volumes/sanDiskPro/Developer/AgentWork/tmp}"
  COPY=$(mktemp -d "$TMP_BASE/vrx299-neg.XXXXXX") || { echo "DESCONHECIDO: mktemp falhou"; exit 3; }
  trap 'rm -rf "$COPY"' EXIT
  git -C "$ROOT" archive HEAD | tar -x -C "$COPY"
  git -C "$COPY" init -q
  git -C "$COPY" add -A
  git -C "$COPY" -c user.name=neg -c user.email=neg@invalid commit -q -m copia --no-gpg-sign
  # controle positivo do instrumento: a copia limpa tem o mesmo veredito de (a) que HEAD
  set +e; check_a_in "$COPY" >/dev/null; CLEAN_N=$?; set -e
  echo "copia limpa: itens do wireframe em HEAD = $CLEAN_N"
  git -C "$ROOT" show origin/main:wrangler.jsonc > "$COPY/wrangler.jsonc"
  git -C "$COPY" add -A
  git -C "$COPY" -c user.name=neg -c user.email=neg@invalid commit -q -m mutante --no-gpg-sign
  set +e; check_a_in "$COPY"; MUT_N=$?; set -e
  echo "copia com wrangler.jsonc restaurado: itens do wireframe em HEAD = $MUT_N (limpa = $CLEAN_N)"
  if [ "$MUT_N" -gt "$CLEAN_N" ]; then
    echo "NEGATIVO: o checker detecta wrangler.jsonc restaurado (exit 1 esperado)"
    exit 1
  fi
  echo "ATENCAO: o checker NAO detectou o mutante (instrumento cego)"
  exit 0
fi

echo "== (a) wireframe ausente em HEAD"
set +e; check_a_in "$ROOT"; N=$?; set -e
[ "$N" -eq 0 ] || say_fail "(a) $N item(ns) do wireframe ainda em HEAD"
[ ! -e "$ROOT/wrangler.jsonc" ] || say_fail "(a) wrangler.jsonc existe na arvore de trabalho"
[ ! -e "$ROOT/uploads" ] || say_fail "(a) uploads/ existe na arvore de trabalho"

echo "== (b) README.md e AGENTS.md sem Arateko (exceto nota que cite legacy-arateko)"
for f in README.md AGENTS.md; do
  [ -f "$ROOT/$f" ] || { say_fail "(b) $f ausente"; continue; }
  # linhas com arateko que NAO citam legacy-arateko
  BAD=$(grep -i 'arateko' "$ROOT/$f" | grep -vi 'legacy-arateko' | wc -l | tr -d ' ') || BAD=0
  TOTAL=$(grep -ci 'arateko' "$ROOT/$f" || true)
  echo "  $f: linhas com arateko = $TOTAL; fora da nota de historico = $BAD"
  [ "$BAD" -eq 0 ] || say_fail "(b) $f cita Arateko fora da nota de historico"
done
grep -qi 'legacy-arateko' "$ROOT/README.md" || say_fail "(b) README.md sem a nota de historico com legacy-arateko"

echo "== (c) tag legacy-arateko no remoto"
if ! LS=$(git ls-remote "$REMOTE_URL" "refs/tags/legacy-arateko*" 2>/dev/null); then
  echo "DESCONHECIDO: git ls-remote falhou (rede/credencial)"; exit 3
fi
LINES=$(printf '%s' "$LS" | grep -c . || true)
echo "  ls-remote: $LINES linha(s): $LS"
if [ "$LINES" -ne 1 ] || [ "$(printf '%s' "$LS" | awk '{print $1}')" != "$TAG_SHA" ]; then
  say_fail "(c) esperado 1 linha com $TAG_SHA"
fi

echo "== (d) diff contra origin/main contido nos PATHS"
git -C "$ROOT" rev-parse --verify -q origin/main >/dev/null || { echo "DESCONHECIDO: origin/main ausente"; exit 3; }
CHANGED=$( { git -C "$ROOT" diff --name-only origin/main; git -C "$ROOT" ls-files --others --exclude-standard; } | sort -u )
OUT=0
while IFS= read -r f; do
  [ -n "$f" ] || continue
  ok=0
  while IFS= read -r pat; do
    # shellcheck disable=SC2254
    case "$f" in $pat) ok=1; break ;; esac
  done <<EOF
$ALLOWED
EOF
  if [ "$ok" -eq 0 ]; then echo "  fora dos PATHS: $f"; OUT=$((OUT + 1)); fi
done <<EOF
$CHANGED
EOF
NCH=$(printf '%s\n' "$CHANGED" | grep -c . || true)
echo "  arquivos alterados: $NCH; fora dos PATHS: $OUT"
[ "$OUT" -eq 0 ] || say_fail "(d) $OUT arquivo(s) fora dos PATHS"

if [ "$FAIL" -eq 0 ]; then echo "OK: VRX-299 atendido"; exit 0; fi
echo "FALHOU: VRX-299"; exit 1
