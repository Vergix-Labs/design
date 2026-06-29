A matriz MCDA — a IA pontua, os Decisores ranqueiam os pesos. Score ponderado automático.

```jsx
import { ScoreTable } from './ScoreTable';

<ScoreTable
  criteria={[
    {label:'Impacto', weight:30, rank:'rank 1'},
    {label:'Esforço', weight:25, rank:'rank 2'},
    {label:'Risco',   weight:25, rank:'rank 3'},
    {label:'Fit',     weight:20, rank:'rank 4'},
  ]}
  options={[
    {name:'Opção A', scores:[4.2,3.8,4.5,4.0]},
    {name:'Opção B', scores:[3.1,4.0,2.9,3.5]},
  ]} />
```

Pesos em % (30 = 30%); o score é a média ponderada. A linha de maior score vira "vencedora".
