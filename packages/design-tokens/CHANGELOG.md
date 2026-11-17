# Changelog

Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/). Versionamento semantico.
Tag, release e publicacao sao do founder e nao fazem parte de nenhuma entrada abaixo.

## [0.1.0] - 2026-11-17

Primeira versao com valores reais (VRX-301). **A paleta e rascunho de agente**, derivada
dos literais hex de `apps/app/src/styles.css` do repo `vergix` (main `3783ef1b`);
o founder ajusta no PR. Nao e "valores finais da marca".

### Added
- Tokens semanticos para os temas `light` (Dia, padrao) e `dark` (Noite), com o mesmo
  conjunto de chaves e `"provisional": false` em todos: texto, superficie, borda,
  acento, link, estados (sucesso, aviso, erro, info), foco, overlay, tipografia
  (familias, tamanhos, pesos, entrelinhas), espacamento, raio, sombra, duracao,
  easing e dimensoes de controle.
- Fontes Spectral, Hanken Grotesk e Spline Sans Mono em woff2 (subconjunto latin) em
  `fonts/<familia>/`, com a licenca OFL de cada familia ao lado; `dist/fonts.css`
  gerado a partir de `src/fonts.json`.
- Testes: contraste >= 4,5:1 (texto x fundo e pares de estado) nos dois temas, paridade
  de chaves, nenhum token provisorio, fontes e licencas presentes, `package.json`.
- `scripts/checks/VRX-301.sh` (com `--negative`).

### Changed
- `provisional` passa a ser booleano por token (antes so `true` era aceito).
- `package.json`: `version` 0.1.0, `private: false`, `files` e `exports` para
  `dist/tokens.css`, `dist/tokens.json`, `dist/fonts.css` e `fonts/**`.
- `scripts/checks/VRX-298.sh` aceita `provisional` booleano e usa os PATHS do VRX-301.

## [0.0.0]

Estrutura do pacote (VRX-298): gerador JSON para CSS `--vx-`, 12 tokens provisorios por tema.
