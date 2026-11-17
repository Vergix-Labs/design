# @vergix-labs/design-tokens

Tokens de design da suite Vergix. O JSON semantico em `src/tokens.json` e a
fonte; o CSS e gerado a partir dele e nunca editado a mao.

Status: `0.1.0`. Valores reais para os temas `light` (Dia, padrao) e `dark`
(Noite), com `"provisional": false` em todo token, mais as fontes Spectral, Hanken
Grotesk e Spline Sans Mono em woff2 com a licenca (OFL 1.1) de cada familia ao lado.
Tag, release e publicacao em GitHub Packages sao do founder e nao acontecem aqui.

## A paleta e rascunho de agente

Os valores de cor sao um **rascunho de agente para ajuste do founder** (ruling
"156=ratifico V1 D-ii"): o tema claro vem dos literais hex de
`apps/app/src/styles.css` (repo `vergix`, main `3783ef1b`) e o escuro foi derivado
com contraste conferido (>= 4,5:1 entre texto e fundo, testado nos dois temas). Os
tons de estado (sucesso, aviso, erro, info), `color.accent.hover`, `color.link.*`,
as bordas de estado e as sombras nao existem na casca atual: sao propostas do
agente. Nao tratar nenhum valor como "valor final da marca".

Contraste: texto (`default`, `muted`, `subtle`) e texto de estado passam de 4,5:1
sobre todas as superficies do pacote, nos dois temas (coberto por teste). As
bordas (`color.border.*`) sao divisorias discretas e ficam abaixo de 3:1 contra o
fundo; se algum componente usar borda como unica fronteira, o founder decide o tom
no ajuste da paleta. `color.text.disabled` nao entra na regra dos 4,5:1.

Decisoes de referencia: `DEC-344` (`Vergix-Labs/design` e o repositorio de design
da suite) e `DEC-348` (a fonte e o front do Vergix v2, com nomes semanticos e
prefixo `--vx-`).

## Formato de `src/tokens.json`

```json
{
  "defaultTheme": "light",
  "themes": {
    "light": {
      "color.text.default": { "value": "#1b1f24", "provisional": false }
    },
    "dark": {
      "color.text.default": { "value": "#1b1f24", "provisional": false }
    }
  }
}
```

- `defaultTheme` nomeia um tema existente em `themes`.
- Nome de tema: minusculas, digitos e hifen (`^[a-z][a-z0-9-]*$`).
- Nome de token: semantico, em segmentos separados por ponto, ao menos dois
  (`^[a-z][a-z0-9]*(\.[a-z0-9]+)+$`), por exemplo `color.text.default`,
  `color.surface.page`, `space.4`, `radius.default`, `font.family.base`.
- Cada token tem so `value` e `provisional` (booleano: `true` = ainda nao decidido,
  `false` = decidido). O `value` e
  texto nao vazio, sem `;`, `{`, `}`, quebra de linha, comentario nem barra
  invertida; aspas precisam ter par e `(`/`)` e `[`/`]` precisam estar
  balanceados (senao o CSS gerado ficaria quebrado).
- `defaultTheme` precisa ser uma chave propria de `themes` (nomes herdados como
  `constructor` sao recusados).
- Um tema sem valores e recusado.

## Como gerar

```sh
node scripts/build-tokens.mjs            # escreve em dist/
node scripts/build-tokens.mjs /algum/dir # diretorio de saida por argumento
node scripts/build-tokens.mjs /algum/dir --src outro/tokens.json
```

Sem dependencias e sem rede. A saida e deterministica (ordem estavel por nome,
sem data nem valor aleatorio). `dist/` esta no `.gitignore` do pacote.

- `dist/tokens.json`: forma canonica, chaves ordenadas.
- `dist/fonts.css`: um `@font-face` por face listada em `src/fonts.json` (woff2 em
  `fonts/<familia>/`, urls relativas `../fonts/...`, subconjunto latin). So sai se
  `src/fonts.json` existir ao lado da fonte de tokens.
- `dist/tokens.css`: uma custom property `--vx-*` por token (pontos viram
  hifens: `color.text.default` vira `--vx-color-text-default`). O tema padrao vai
  em `:root`; cada outro tema vai em `[data-theme="<nome>"]`, um bloco por tema.

## Testes

```sh
npm test                                          # node --test dos 2 arquivos de teste
bash ../../scripts/checks/VRX-301.sh              # DoD do VRX-301 (inclui o VRX-298.sh)
bash ../../scripts/checks/VRX-301.sh --negative   # exit 0 = todos os mutantes detectados
bash ../../scripts/checks/VRX-298.sh              # estrutura do pacote (VRX-298)
bash ../../scripts/checks/VRX-298.sh --negative   # exit 1 = mutantes detectados
```

Este repositorio nao tem CI; o checker local e a prova.

## Consumo

O ADR 0001 da suite manda consumir versao exata em lockfile e nunca `latest` em
runtime. O candidato de release e o pin exato ficam no `VRX-156`.

Entradas publicas (`exports`): `./tokens.css`, `./tokens.json`, `./fonts.css` e
`./fonts/*`. `dist/` e gerado (esta no `.gitignore`); `prepare` roda o build para
quem instala o pacote a partir do git.
