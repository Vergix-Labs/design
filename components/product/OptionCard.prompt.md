Cartão de opção/critério para o board de Expandir — marca a origem (IA vs. humano).

```jsx
import { OptionCard } from './OptionCard';

<OptionCard source="ia" title="Programa de indicações"
  body="Incentivo a usuários ativos a trazerem times." tags={['crescimento','baixo custo']} />
<OptionCard source="humano" title="Custo de implementação" rank="rank 1" />
<OptionCard source="ia" title="Onboarding assistido" selected onClick={pick} />
```

Use a mesma peça nas duas colunas (opções e critérios). `selected` dá o contorno âmbar.
