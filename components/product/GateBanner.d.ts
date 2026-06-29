import * as React from 'react';

/**
 * O banner de gate da Arateko — o momento em que o humano decide. O orbe âmbar é o farol da
 * marca: nada avança sem o aval. Use nos quatro gates (DNA+KPIs · pesos · sobrevivência ·
 * go/no-go). Coloque os botões de aprovação em `actions` (normalmente um `Button variant="accent"`).
 *
 * @startingPoint section="Produto" subtitle="Banner de decisão humana (gate)" viewport="700x200"
 */
export interface GateBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Número do gate (1–4). */
  gate?: 1 | 2 | 3 | 4;
  /** Título da decisão. */
  title?: React.ReactNode;
  /** Descrição do que está sendo julgado. */
  description?: React.ReactNode;
  /** Linha de ações (botões aprovar/editar). */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function GateBanner(props: GateBannerProps): JSX.Element;
