A trilha de decisão auditável — o moat. Registra cada gate e se o humano confirmou ou sobrescreveu a IA.

```jsx
import { DecisionLog } from './DecisionLog';

<DecisionLog entries={[
  {gate:1, decision:'DNA + KPIs', options:'—', who:'Decisor', action:'confirmou'},
  {gate:2, decision:'Pesos dos critérios', options:'4 critérios', who:'Decisores', action:'sobrescreveu'},
  {gate:3, decision:'Vencedora', options:'A, B, C', who:'Facilitador', action:'confirmou'},
]} />
```

`action` = `confirmou` (verde) ou `sobrescreveu` (âmbar).
