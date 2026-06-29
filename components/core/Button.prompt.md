Botão de ação da Arateko — `primary` (ink) é a ação principal; `accent` (âmbar) é reservado para aprovações de valor nos gates.

```jsx
import { Button } from './Button';

<Button variant="accent" onClick={aprovar}>Aprovar charter</Button>
<Button variant="ai" leftIcon={<IconSparkle/>}>IA: ampliar pool</Button>
<Button variant="secondary">Editar</Button>
<Button variant="ghost" size="sm">Cancelar</Button>
```

Variantes: `primary · accent · secondary · ghost · ai · danger`. Tamanhos: `sm · md · lg`. Props extras de `<button>` (onClick, disabled, type) passam direto. Use `accent` com parcimônia — é o farol; um por tela, no momento da decisão.
