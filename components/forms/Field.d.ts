import * as React from 'react';

/**
 * Campo de entrada da Arateko, com rótulo CAIXA ALTA espaçada (motivo de marca), hint e estado
 * inválido. Use `multiline` para uma textarea (ex.: enunciado do desafio). Repasse qualquer prop
 * de `<input>`/`<textarea>` (placeholder, value, onChange, type…).
 */
export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  /** Rótulo acima do controle. */
  label?: React.ReactNode;
  /** Texto de ajuda / erro abaixo do controle. */
  hint?: React.ReactNode;
  /** Marca o campo como obrigatório (asterisco âmbar). */
  required?: boolean;
  /** Estado de erro. */
  invalid?: boolean;
  /** Renderiza uma textarea. */
  multiline?: boolean;
  /** Linhas da textarea. */
  rows?: number;
}

export function Field(props: FieldProps): JSX.Element;
