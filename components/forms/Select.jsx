import React from 'react';

/* Arateko · Select — dropdown nativo estilizado, casado com o Field. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-select{display:flex;flex-direction:column;gap:var(--space-2);font-family:var(--font-sans)}
  .ar-select__label{
    font-size:var(--fs-3xs);font-weight:var(--fw-semibold);text-transform:uppercase;
    letter-spacing:var(--ls-label);color:var(--text-muted);
  }
  .ar-select__wrap{position:relative;display:flex}
  .ar-select__ctl{
    appearance:none;width:100%;box-sizing:border-box;
    font-family:var(--font-sans);font-size:var(--fs-sm);color:var(--text);
    background:var(--white);border:1px solid var(--border);border-radius:var(--radius-sm);
    padding:0 2.2rem 0 .75rem;height:var(--field-h);cursor:pointer;
    transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out);
  }
  .ar-select__ctl:hover{border-color:var(--border-strong)}
  .ar-select__ctl:focus{outline:none;border-color:var(--accent);box-shadow:var(--ring)}
  .ar-select__chev{
    position:absolute;right:.7rem;top:50%;transform:translateY(-50%);
    pointer-events:none;color:var(--text-muted);font-size:11px;
  }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'select');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Select({
  label = null,
  options = [],
  placeholder = null,
  id,
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const fid = id || (label ? `s-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <label className={['ar-select', className].filter(Boolean).join(' ')} htmlFor={fid}>
      {label && <span className="ar-select__label">{label}</span>}
      <span className="ar-select__wrap">
        <select id={fid} className="ar-select__ctl" {...rest}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {children || options.map((o) => {
            const val = typeof o === 'string' ? o : o.value;
            const lbl = typeof o === 'string' ? o : o.label;
            return <option key={val} value={val}>{lbl}</option>;
          })}
        </select>
        <span className="ar-select__chev">▾</span>
      </span>
    </label>
  );
}
