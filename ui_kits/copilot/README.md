# UI kit — Copilot de sessão (Arateko)

Recriação de alta fidelidade e interativa do MVP da Arateko: o **Copilot de sessão** (intensidade
Sprint). Percorre o **Funil de Valor** de 5 fases com os **4 gates humanos**, do desafio difuso à
decisão auditável.

Abra `index.html` e clique em **Continuar** para avançar. Os gates **bloqueiam** o avanço até você
aprovar (Aprovar charter · Confirmar pesos · Confirmar sobrevivência · Dar o go) — e o decision log
final reflete o que foi confirmado.

## Fluxo
`Onboarding → Escopo/4Ms → Charter (GATE 1) → Expandir → Ranquear/MCDA (GATE 2) →
Convergir/Funil (GATE 3) → Operar/KPIs (GATE 4) → Decision log`

## Arquivos
- `index.html` — monta o app (carrega o bundle do design system + as telas).
- `app.jsx` — shell (top bar com a marca, PhaseStepper, meta da sessão) + navegação + estado.
- `icons.jsx` — `ArIcon` (geometria derivada do Lucide — substituição sinalizada).
- `screens-early.jsx` — Onboarding · Escopo · Charter.
- `screens-mid.jsx` — Expandir · Ranquear · Convergir.
- `screens-late.jsx` — Operar · Decision log.

## Componentes usados
Compõe os primitivos do design system (não os reimplementa): `Card`, `Field`, `Select`, `Pill`,
`Badge`, `Button`, `PhaseStepper`, `GateBanner`, `AINote`, `OptionCard`, `ScoreTable`,
`DecisionLog` — todos via `window.AratekoLabsDesignSystem_0b81f3`.

## Fidelidade
Recriação fiel do wireframe fornecido, elevada à identidade de marca (duas superfícies, cor
semântica IA/gate, tipografia Spectral/Hanken/Spline). Não é código de produção — atalhos de
funcionalidade onde o foco é visual/interativo.
