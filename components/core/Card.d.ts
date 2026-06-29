import * as React from 'react';

/**
 * Contêiner de superfície da Arateko. Borda de fio de cabelo completa + raio calmo + sombra
 * quente opcional. Passe `title`/`meta` para a barra de cabeçalho (como as "screens" do
 * wireframe), ou `header` para um cabeçalho custom. Sem cabeçalho, o conteúdo é renderizado
 * direto com padding.
 *
 * @startingPoint section="Núcleo" subtitle="Card com barra de título e corpo" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Título na barra de cabeçalho. */
  title?: React.ReactNode;
  /** Meta à direita do cabeçalho (mono, ex.: "fase 1 · GATE 1"). */
  meta?: React.ReactNode;
  /** Cabeçalho custom (substitui title/meta). */
  header?: React.ReactNode;
  /** Sombra. */
  elevation?: 'flat' | 'raised';
  /** Raio do contêiner. */
  radius?: 'sm' | 'md' | 'lg';
  /** Estados de hover/press para cards clicáveis. */
  interactive?: boolean;
  /** Fundo levemente afundado. */
  sunken?: boolean;
  /** Força padding interno (padrão: liga quando não há cabeçalho). */
  padded?: boolean;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
