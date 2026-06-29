import React from 'react';

/* Arateko · Card — contêiner base de superfície de produto. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-card{
    background:var(--surface-card);border:1px solid var(--border);
    border-radius:var(--radius-lg);overflow:hidden;
    font-family:var(--font-sans);color:var(--text);
  }
  .ar-card--pad{padding:var(--space-5)}
  .ar-card--sm{border-radius:var(--radius-md)}
  .ar-card--lg{border-radius:var(--radius-xl)}
  .ar-card--raised{box-shadow:var(--shadow-md);border-color:var(--border-soft)}
  .ar-card--flat{box-shadow:none}
  .ar-card--sunken{background:var(--surface-sub)}
  .ar-card--interactive{cursor:pointer;transition:box-shadow var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out),transform var(--dur-fast) var(--ease-out)}
  .ar-card--interactive:hover{box-shadow:var(--shadow-lg);border-color:var(--border-strong)}
  .ar-card--interactive:active{transform:translateY(1px)}
  .ar-card__bar{
    display:flex;align-items:center;justify-content:space-between;gap:var(--space-3);
    padding:var(--space-3) var(--space-4);border-bottom:1px solid var(--border);
    background:var(--surface-sub);
  }
  .ar-card__title{font:var(--text-subheading);color:var(--text-strong);margin:0}
  .ar-card__meta{font-size:var(--fs-2xs);color:var(--text-hint);font-family:var(--font-mono)}
  .ar-card__body{padding:var(--space-5) var(--space-4)}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'card');
  el.textContent = css;
  document.head.appendChild(el);
}

export function Card({
  title = null,
  meta = null,
  header = null,
  elevation = 'flat',
  radius = 'md',
  interactive = false,
  sunken = false,
  padded,
  children,
  className = '',
  ...rest
}) {
  ensureStyles();
  const hasBar = header || title || meta;
  const autoPad = padded != null ? padded : !hasBar;
  const cls = [
    'ar-card',
    radius === 'sm' ? 'ar-card--sm' : radius === 'lg' ? 'ar-card--lg' : '',
    elevation === 'raised' ? 'ar-card--raised' : 'ar-card--flat',
    interactive ? 'ar-card--interactive' : '',
    sunken ? 'ar-card--sunken' : '',
    autoPad ? 'ar-card--pad' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <div className={cls} {...rest}>
      {hasBar && (
        <div className="ar-card__bar">
          {header || <h3 className="ar-card__title">{title}</h3>}
          {meta && <span className="ar-card__meta">{meta}</span>}
        </div>
      )}
      {hasBar ? <div className="ar-card__body">{children}</div> : children}
    </div>
  );
}
