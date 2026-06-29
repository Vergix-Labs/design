Campo de texto com o rótulo CAIXA ALTA espaçada da marca, hint e estado inválido.

```jsx
import { Field } from './Field';

<Field label="Qual é o desafio?" multiline
       placeholder="Ex.: Como priorizar onde investir o próximo trimestre?" />
<Field label="Objetivo" required hint="Uma linha." />
<Field label="KPI" invalid hint="Defina ao menos um KPI." />
```

`multiline` → textarea; props de input/textarea passam direto.
