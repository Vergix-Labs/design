Contêiner de superfície — a "screen"/painel do produto, com barra de título opcional e corpo.

```jsx
import { Card } from './Card';

<Card title="Charter — Enquadrar" meta="fase 1 · GATE 1">
  …conteúdo…
</Card>

<Card elevation="raised" interactive radius="lg">cartão de opção</Card>
```

`elevation="raised"` para destacar; `interactive` para cards clicáveis (hover/press); `radius` sm/md/lg. Cards Arateko usam borda completa — nunca só a borda esquerda colorida.
