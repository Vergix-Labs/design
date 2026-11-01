# @vergix-labs/design-tokens

Tokens de design da suite Vergix. O JSON semantico em `src/tokens.json` e a
fonte; o CSS e gerado a partir dele e nunca editado a mao.

Status: `0.0.0`, `private`. So a estrutura do pacote existe. Nada aqui e
publicado, taggeado ou lancado.

## Regra: todo valor e provisorio ate o VRX-156

Todo token leva `"provisional": true`, e o gerador recusa um token sem isso. Os
valores atuais sao um conjunto minimo, medido nos literais do CSS provisorio de
`apps/app/src/styles.css` (repo `Vergix-Labs/vergix`) ou placeholders neutros. O
tema `dark` repete os valores do claro apenas para existir como estrutura. A
decisao visual real, incluindo os valores do escuro e as fontes, e do founder no
`VRX-156`. Nao trate nenhum valor deste pacote como decisao de design.

Decisoes de referencia: `DEC-344` (`Vergix-Labs/design` e o repositorio de design
da suite) e `DEC-348` (a fonte e o front do Vergix v2, com nomes semanticos e
prefixo `--vx-`).

## Formato de `src/tokens.json`

```json
{
  "defaultTheme": "light",
  "themes": {
    "light": {
      "color.text.default": { "value": "#1b1f24", "provisional": true }
    },
    "dark": {
      "color.text.default": { "value": "#1b1f24", "provisional": true }
    }
  }
}
```

- `defaultTheme` nomeia um tema existente em `themes`.
- Nome de tema: minusculas, digitos e hifen (`^[a-z][a-z0-9-]*$`).
- Nome de token: semantico, em segmentos separados por ponto, ao menos dois
  (`^[a-z][a-z0-9]*(\.[a-z0-9]+)+$`), por exemplo `color.text.default`,
  `color.surface.page`, `space.4`, `radius.default`, `font.family.base`.
- Cada token tem so `value` (texto nao vazio, sem `;`, `{`, `}`, quebra de linha
  ou comentario) e `provisional` (precisa ser `true`).
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
- `dist/tokens.css`: uma custom property `--vx-*` por token (pontos viram
  hifens: `color.text.default` vira `--vx-color-text-default`). O tema padrao vai
  em `:root`; cada outro tema vai em `[data-theme="<nome>"]`, um bloco por tema.

## Testes

```sh
node --test test/build-tokens.test.mjs
bash ../../scripts/checks/VRX-298.sh             # DoD do ticket
bash ../../scripts/checks/VRX-298.sh --negative  # exit 1 = mutantes detectados
```

Este repositorio nao tem CI; o checker local e a prova.

## Consumo

O ADR 0001 da suite manda consumir versao exata em lockfile e nunca `latest` em
runtime. O candidato de release e o pin exato ficam no `VRX-156`.
