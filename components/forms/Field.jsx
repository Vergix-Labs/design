import React from 'react';

/* Arateko · Field — campo de texto com rótulo (motivo: rótulo CAIXA ALTA espaçada). */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-field{display:flex;flex-direction:column;gap:var(--space-2);font-family:var(--font-sans)}
  .ar-field__label{
    font-size:var(--fs-3xs);font-weight:var(--fw-semibold);text-transform:uppercase;
    letter-spacing:var(--ls-label);color:var(--text-muted);
  }
  .ar-field__req{color:var(--accent-strong);margin-left:.2em}
  .ar-field__ctl{
    width:100%;box-sizing:border-box;font-family:var(--font-sans);font-size:var(--fs-sm);
    color:var(--text);background:var(--white);
    border:1px solid var(--border);border-radius:var(--radius-sm);
    padding:0 .75rem;height:var(--field-h);
    transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out);
  }
  textarea.ar-field__ctl{height:auto;padding:.6rem .75rem;line-height:var(--lh-normal);resize:vertical;min-height:5rem}
  .ar-field__ctl::placeholder{color:var(--text-hint)}
  .ar-field__ctl:hover{border-color:var(--border-strong)}
  .ar-field__ctl:focus{outline:none;border-color:var(--accent);box-shadow:var(--ring)}
  .ar-field--invalid .ar-field__ctl{border-color:var(--negative)}
  .ar-field--invalid .ar-field__ctl:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--negative) 30%,transparent)}
  .ar-field__hint{font-size:var(--fs-2xs);color:var(--text-hint)}
  .ar-field--invalid .ar-field__hint{color:var(--negative)}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'field');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Field({
  label = null,
  hint = null,
  required = false,
  invalid = false,
  multiline = false,
  rows = 3,
  id,
  className = '',
  ...rest
}) {
  ensureStyles();
  const fid = id || (label ? `f-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const cls = ['ar-field', invalid ? 'ar-field--invalid' : '', className].filter(Boolean).join(' ');
  const Ctl = multiline ? 'textarea' : 'input';
  return (
    <label className={cls} htmlFor={fid}>
      {label && (
        <span className="ar-field__label">
          {label}{required && <span className="ar-field__req">*</span>}
        </span>
      )}
      <Ctl id={fid} className="ar-field__ctl" rows={multiline ? rows : undefined} {...rest} />
      {hint && <span className="ar-field__hint">{hint}</span>}
    </label>
  );
}
