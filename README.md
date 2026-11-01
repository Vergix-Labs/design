# Vergix Design

Repositório de design da suíte **Vergix**: a fonte dos tokens de design e das
regras de uso que as superfícies Vergix consomem.

Este repositório não publica nenhum site, worker ou asset. Não há configuração de
deploy aqui, e nenhuma é esperada sem decisão registrada.

## Estado atual

O repositório está em ponto zero, pronto para receber o pacote de tokens:

- `packages/design-tokens/` (previsto no `VRX-298`): tokens semânticos em JSON,
  build para CSS com prefixo `--vx-`, temas e um checker.

Até esse pacote entrar, não há código, componentes nem tokens neste repositório.

## Regras

- Todo token público usa o prefixo `--vx-`.
- Valores vivem no JSON semântico; o CSS é sempre gerado a partir dele, nunca
  editado à mão.
- Nada neste repositório deve ser publicado por padrão: qualquer publicação exige
  uma configuração explícita, restrita ao que deve ser público, e decisão do
  founder.

## Contrato de agentes

Veja o [`AGENTS.md`](./AGENTS.md).

## Histórico

Este repositório abrigou antes um protótipo de design system (wireframe) com
configuração de worker. Esse conteúdo foi retirado da `main` pelo `VRX-299`
(decisões `DEC-344` e `DEC-348`). Nada foi apagado do histórico: o estado
anterior permanece na tag `legacy-arateko`
(`3e1e1734517c30ffb2890598f82268e0a8e5d005`).
