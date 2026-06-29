import * as React from 'react';

/**
 * Dropdown nativo estilizado da Arateko, casado visualmente com o Field. Passe `options`
 * (strings ou `{value,label}`) ou `<option>`s como children. Repassa props de `<select>`
 * (value, defaultValue, onChange…).
 */
export interface SelectOption { value: string; label: string; }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Rótulo CAIXA ALTA espaçada acima do controle. */
  label?: React.ReactNode;
  /** Opções como strings ou objetos {value,label}. */
  options?: (string | SelectOption)[];
  /** Opção-placeholder desabilitada inicial. */
  placeholder?: string;
}

export function Select(props: SelectProps): JSX.Element;
