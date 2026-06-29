Chip/tag para listas e seleção — usado em stakeholders, 4Ms, critérios, filtros.

```jsx
import { Pill } from './Pill';

<Pill>Manpower</Pill>
<Pill selected onClick={toggle}>Sprint</Pill>
<Pill accent onRemove={() => drop(id)}>Decisores</Pill>
```

`selected` = preenchimento ink; `accent` = âmbar; `onClick` torna clicável (ganha hover); `onRemove` exibe um × removível.
