Selo de status semântico — codifica a gramática Arateko de IA / gate / artefato / passa / elimina.

```jsx
import { Badge } from './Badge';

<Badge tone="ai" />              {/* → IA */}
<Badge tone="gate">GATE 2</Badge>
<Badge tone="artifact" />        {/* → artefato */}
<Badge tone="positive" />        {/* → passa */}
<Badge tone="negative" />        {/* → elimina */}
```

Sem `children`, cada tom traz seu rótulo padrão. Use `dot` para um ponto de status e `icon` para um glifo Lucide. Não invente cores novas para status — use os tons.
