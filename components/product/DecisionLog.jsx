import React from 'react';

/* Arateko · DecisionLog — a trilha auditável. O moat: memória de decisões + auditoria. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-log{width:100%;border-collapse:collapse;font-family:var(--font-sans);font-size:var(--fs-xs);color:var(--text)}
  .ar-log th,.ar-log td{border:1px solid var(--border);padding:.55rem .7rem;text-align:left;vertical-align:top}
  .ar-log thead th{background:var(--surface-sub);color:var(--text-muted);font-weight:600;font-size:var(--fs-2xs);text-transform:uppercase;letter-spacing:.04em}
  .ar-log__gate{font-family:var(--font-mono);font-weight:600;color:var(--gate-text);white-space:nowrap}
  .ar-log__dec{font-weight:600;color:var(--text-strong)}
  .ar-log__who{color:var(--text-muted)}
  .ar-log__act{display:inline-flex;align-items:center;gap:.35em;font-size:var(--fs-2xs);font-weight:600;padding:.18em .6em;border-radius:var(--radius-pill);border:1px solid transparent;white-space:nowrap}
  .ar-log__act--confirmou{background:var(--positive-bg);color:var(--positive);border-color:color-mix(in srgb,var(--positive) 25%,transparent)}
  .ar-log__act--sobrescreveu{background:var(--accent-soft);color:var(--accent-strong);border-color:var(--gate-border)}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'log');
  el.textContent = css;
  document.head.appendChild(el);
}

export function DecisionLog({
  entries = [],   // [{gate, decision, options, who, action}]
  className = '',
  ...rest
}) {
  ensureStyles();
  return (
    <table className={['ar-log', className].filter(Boolean).join(' ')} {...rest}>
      <thead>
        <tr>
          <th>Gate</th>
          <th>Decisão</th>
          <th>Opções consideradas</th>
          <th>Quem</th>
          <th>IA</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e, i) => (
          <tr key={i}>
            <td className="ar-log__gate">GATE {e.gate}</td>
            <td className="ar-log__dec">{e.decision}</td>
            <td>{e.options || '—'}</td>
            <td className="ar-log__who">{e.who}</td>
            <td>
              {e.action && (
                <span className={`ar-log__act ar-log__act--${e.action}`}>
                  {e.action === 'confirmou' ? 'confirmou' : 'sobrescreveu'}
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
