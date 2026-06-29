Progresso pelo Funil de Valor (as 5 fases) com os 4 gates humanos marcados.

```jsx
import { PhaseStepper } from './PhaseStepper';

<PhaseStepper current={2} />  {/* em "Ranquear" — GATE 2 */}
```

`current` = índice 0-based da fase ativa. Os gates (1 Enquadrar · 2 Ranquear · 3 Convergir · 4 Operar) aparecem por padrão; desligue com `showGates={false}`.
