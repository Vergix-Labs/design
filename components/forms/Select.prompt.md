Dropdown nativo estilizado, casado com o Field.

```jsx
import { Select } from './Select';

<Select label="Intensidade" options={['Sprint','Journey','Method','Meta']} defaultValue="Sprint" />
<Select label="Dono do peso" placeholder="Selecione um Decisor" options={decisores} onChange={…} />
```

`options` aceita strings ou `{value,label}`; também aceita `<option>`s como children.
