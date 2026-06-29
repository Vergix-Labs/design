O momento de decisão humana — o orbe âmbar é o farol da marca. Use nos 4 gates.

```jsx
import { GateBanner } from './GateBanner';
import { Button } from '../core/Button';

<GateBanner gate={2}
  title="Os Decisores são donos dos pesos"
  description={<>A ordenação dos critérios <b>é</b> o funil. A IA propõe pesos; os humanos decidem.</>}
  actions={<>
    <Button variant="accent" size="sm">Confirmar pesos</Button>
    <Button variant="ghost" size="sm">Ajustar</Button>
  </>} />
```

Nada avança sem o aval. Coloque a ação principal como `Button variant="accent"`.
