import React from 'react';

/* Arateko · OptionCard — cartão de opção/critério no board de Expandir. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-opt{
    position:relative;display:flex;flex-direction:column;gap:.4rem;
    background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);
    padding:var(--space-3) var(--space-4);font-family:var(--font-sans);
    transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);
  }
  .ar-opt--clickable{cursor:pointer}
  .ar-opt--clickable:hover{border-color:var(--border-strong);box-shadow:var(--shadow-sm)}
  .ar-opt--clickable:active{transform:translateY(1px)}
  .ar-opt--selected{border-color:var(--amber-400);box-shadow:0 0 0 1px var(--amber-400)}
  .ar-opt__top{display:flex;align-items:center;gap:.5rem}
  .ar-opt__src{
    font-size:9px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;
    padding:.12em .5em;border-radius:var(--radius-pill);border:1px solid transparent;
  }
  .ar-opt__src--ia{background:var(--ai-bg);color:var(--ai-text);border-color:var(--ai-border)}
  .ar-opt__src--humano{background:var(--surface-sunken);color:var(--text-muted);border-color:var(--border-soft)}
  .ar-opt__rank{margin-left:auto;font-family:var(--font-mono);font-size:var(--fs-2xs);color:var(--text-hint)}
  .ar-opt__title{font-size:var(--fs-sm);font-weight:var(--fw-semibold);color:var(--text-strong);line-height:1.3}
  .ar-opt__body{font-size:var(--fs-xs);color:var(--text-muted);line-height:var(--lh-normal);margin:0}
  .ar-opt__tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.15rem}
  .ar-opt__tag{font-size:10px;color:var(--text-hint);background:var(--surface-sunken);border-radius:var(--radius-pill);padding:.1em .55em}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'optcard');
  el.textContent = css;
  document.head.appendChild(el);
}

export function OptionCard({
  title,
  body = null,
  source = null,        // 'ia' | 'humano'
  rank = null,
  tags = [],
  selected = false,
  onClick = null,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = [
    'ar-opt',
    onClick ? 'ar-opt--clickable' : '',
    selected ? 'ar-opt--selected' : '',
    className,
  ].filter(Boolean).join(' ');
  const hasTop = source || rank;
  return (
    <div className={cls} onClick={onClick} {...rest}>
      {hasTop && (
        <div className="ar-opt__top">
          {source && <span className={`ar-opt__src ar-opt__src--${source}`}>{source === 'ia' ? 'IA' : 'humano'}</span>}
          {rank != null && <span className="ar-opt__rank">{rank}</span>}
        </div>
      )}
      <div className="ar-opt__title">{title}</div>
      {body && <p className="ar-opt__body">{body}</p>}
      {tags.length > 0 && (
        <div className="ar-opt__tags">
          {tags.map((t) => <span key={t} className="ar-opt__tag">{t}</span>)}
        </div>
      )}
    </div>
  );
}
