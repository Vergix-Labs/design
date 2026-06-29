/* @ds-bundle: {"format":3,"namespace":"AratekoLabsDesignSystem_0b81f3","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"AINote","sourcePath":"components/product/AINote.jsx"},{"name":"DecisionLog","sourcePath":"components/product/DecisionLog.jsx"},{"name":"GateBanner","sourcePath":"components/product/GateBanner.jsx"},{"name":"OptionCard","sourcePath":"components/product/OptionCard.jsx"},{"name":"PhaseStepper","sourcePath":"components/product/PhaseStepper.jsx"},{"name":"ScoreTable","sourcePath":"components/product/ScoreTable.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"0cf99d4355f8","components/core/Button.jsx":"288720686d11","components/core/Card.jsx":"7ea6979bb97c","components/core/Pill.jsx":"97e7c82ff2c6","components/forms/Field.jsx":"c348e11d3f94","components/forms/Select.jsx":"2945d6483d5b","components/product/AINote.jsx":"a8896256a184","components/product/DecisionLog.jsx":"2a5340afb7f7","components/product/GateBanner.jsx":"cee86d688ee8","components/product/OptionCard.jsx":"06710ec0ec68","components/product/PhaseStepper.jsx":"88244f9d5e99","components/product/ScoreTable.jsx":"8ebf369bc290","ui_kits/copilot/app.jsx":"eec0eee87441","ui_kits/copilot/icons.jsx":"2bd9ac40eeda","ui_kits/copilot/screens-early.jsx":"3132aaab66b6","ui_kits/copilot/screens-late.jsx":"238203f02cf3","ui_kits/copilot/screens-mid.jsx":"2389beea0152"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AratekoLabsDesignSystem_0b81f3 = window.AratekoLabsDesignSystem_0b81f3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Arateko · Badge — status semântico (IA / GATE / artefato / passa / elimina). */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-badge{
    display:inline-flex;align-items:center;gap:.4em;
    font-family:var(--font-sans);font-weight:var(--fw-semibold);
    font-size:var(--fs-3xs);letter-spacing:var(--ls-wide);
    line-height:1;padding:.32em .7em;border-radius:var(--radius-pill);
    border:1px solid transparent;white-space:nowrap;
  }
  .ar-badge--solid{border-radius:var(--radius-sm)}
  .ar-badge svg{width:1.1em;height:1.1em}
  .ar-badge--ai{background:var(--ai-bg);color:var(--ai-text);border-color:var(--ai-border)}
  .ar-badge--gate{background:var(--gate-bg);color:var(--gate-text);border-color:var(--gate-border)}
  .ar-badge--artifact{background:var(--artifact-bg);color:var(--artifact-text);border-color:var(--border-soft)}
  .ar-badge--positive{background:var(--positive-bg);color:var(--positive);border-color:color-mix(in srgb,var(--positive) 25%,transparent)}
  .ar-badge--negative{background:var(--negative-bg);color:var(--negative);border-color:color-mix(in srgb,var(--negative) 25%,transparent)}
  .ar-badge--neutral{background:var(--surface-sunken);color:var(--text-muted);border-color:var(--border-soft)}
  .ar-badge--accent{background:var(--accent-soft);color:var(--accent-strong);border-color:var(--gate-border)}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'badge');
  el.textContent = css;
  document.head.appendChild(el);
}
const LABELS = {
  ai: 'IA',
  gate: 'GATE',
  artifact: 'artefato',
  positive: 'passa',
  negative: 'elimina'
};
function Badge({
  tone = 'neutral',
  children,
  icon = null,
  dot = false,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = ['ar-badge', `ar-badge--${tone}`, className].filter(Boolean).join(' ');
  const content = children != null ? children : LABELS[tone] || '';
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '.45em',
      height: '.45em',
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), icon, content);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Arateko · Button — injeta seu CSS uma vez, usando os tokens do design system. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-btn{
    display:inline-flex;align-items:center;justify-content:center;gap:.5em;
    font-family:var(--font-sans);font-weight:var(--fw-semibold);
    border:1px solid transparent;border-radius:var(--radius-sm);
    cursor:pointer;white-space:nowrap;text-decoration:none;
    transition:background var(--dur-fast) var(--ease-out),
               border-color var(--dur-fast) var(--ease-out),
               color var(--dur-fast) var(--ease-out),
               box-shadow var(--dur-fast) var(--ease-out);
  }
  .ar-btn:focus-visible{outline:none;box-shadow:var(--ring)}
  .ar-btn[disabled]{opacity:.45;cursor:not-allowed;box-shadow:none}
  /* sizes */
  .ar-btn--sm{height:var(--field-h-sm);padding:0 .75rem;font-size:var(--fs-xs)}
  .ar-btn--md{height:var(--field-h);padding:0 1.1rem;font-size:var(--fs-sm)}
  .ar-btn--lg{height:var(--field-h-lg);padding:0 1.5rem;font-size:var(--fs-md)}
  .ar-btn--full{width:100%}
  /* primary — ink sólido */
  .ar-btn--primary{background:var(--ink-800);color:var(--text-inverse);border-color:var(--ink-800)}
  .ar-btn--primary:hover:not([disabled]){background:var(--ink-900);border-color:var(--ink-900)}
  .ar-btn--primary:active:not([disabled]){background:var(--ink-950)}
  /* accent — o farol âmbar (aprovações de valor) */
  .ar-btn--accent{background:var(--amber-400);color:#fff;border-color:var(--amber-400)}
  .ar-btn--accent:hover:not([disabled]){background:var(--amber-500);border-color:var(--amber-500)}
  .ar-btn--accent:active:not([disabled]){background:var(--amber-600)}
  /* secondary — papel com borda */
  .ar-btn--secondary{background:var(--white);color:var(--text-strong);border-color:var(--border-strong)}
  .ar-btn--secondary:hover:not([disabled]){background:var(--surface-sunken);border-color:var(--ink-400)}
  /* ghost */
  .ar-btn--ghost{background:transparent;color:var(--text-muted);border-color:transparent}
  .ar-btn--ghost:hover:not([disabled]){background:var(--surface-sunken);color:var(--text-strong)}
  /* ai — ação de agente */
  .ar-btn--ai{background:var(--ai-bg);color:var(--ai-text);border-color:var(--ai-border)}
  .ar-btn--ai:hover:not([disabled]){background:var(--slate-200)}
  /* danger */
  .ar-btn--danger{background:transparent;color:var(--negative);border-color:color-mix(in srgb,var(--negative) 40%,transparent)}
  .ar-btn--danger:hover:not([disabled]){background:var(--negative-bg)}
  .ar-btn svg{width:1.15em;height:1.15em;flex:0 0 auto}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'button');
  el.textContent = css;
  document.head.appendChild(el);
}
function Button({
  variant = 'primary',
  size = 'md',
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  ensureStyles();
  const cls = ['ar-btn', `ar-btn--${variant}`, `ar-btn--${size}`, fullWidth ? 'ar-btn--full' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls
  }, rest), leftIcon, children != null && /*#__PURE__*/React.createElement("span", null, children), rightIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Card({
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
  const cls = ['ar-card', radius === 'sm' ? 'ar-card--sm' : radius === 'lg' ? 'ar-card--lg' : '', elevation === 'raised' ? 'ar-card--raised' : 'ar-card--flat', interactive ? 'ar-card--interactive' : '', sunken ? 'ar-card--sunken' : '', autoPad ? 'ar-card--pad' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), hasBar && /*#__PURE__*/React.createElement("div", {
    className: "ar-card__bar"
  }, header || /*#__PURE__*/React.createElement("h3", {
    className: "ar-card__title"
  }, title), meta && /*#__PURE__*/React.createElement("span", {
    className: "ar-card__meta"
  }, meta)), hasBar ? /*#__PURE__*/React.createElement("div", {
    className: "ar-card__body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Arateko · Pill — chip/tag de seleção e listagem (Manpower, Decisores, internos…). */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-pill{
    display:inline-flex;align-items:center;gap:.4em;
    font-family:var(--font-sans);font-size:var(--fs-xs);font-weight:var(--fw-medium);
    color:var(--text-muted);background:var(--white);
    border:1px solid var(--border);border-radius:var(--radius-pill);
    padding:.28em .85em;line-height:1.4;cursor:default;
    transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out);
  }
  .ar-pill--clickable{cursor:pointer}
  .ar-pill--clickable:hover{border-color:var(--border-strong);color:var(--text-strong)}
  .ar-pill--selected{background:var(--ink-800);color:var(--text-inverse);border-color:var(--ink-800)}
  .ar-pill--accent{background:var(--accent-soft);color:var(--accent-strong);border-color:var(--gate-border)}
  .ar-pill svg{width:1.05em;height:1.05em}
  .ar-pill__x{margin-left:.1em;opacity:.6;cursor:pointer}
  .ar-pill__x:hover{opacity:1}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'pill');
  el.textContent = css;
  document.head.appendChild(el);
}
function Pill({
  selected = false,
  accent = false,
  icon = null,
  onRemove = null,
  onClick = null,
  children,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = ['ar-pill', onClick ? 'ar-pill--clickable' : '', selected ? 'ar-pill--selected' : '', accent && !selected ? 'ar-pill--accent' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    onClick: onClick
  }, rest), icon, children, onRemove && /*#__PURE__*/React.createElement("span", {
    className: "ar-pill__x",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Field({
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
  return /*#__PURE__*/React.createElement("label", {
    className: cls,
    htmlFor: fid
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "ar-field__label"
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "ar-field__req"
  }, "*")), /*#__PURE__*/React.createElement(Ctl, _extends({
    id: fid,
    className: "ar-field__ctl",
    rows: multiline ? rows : undefined
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    className: "ar-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Select({
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
  return /*#__PURE__*/React.createElement("label", {
    className: ['ar-select', className].filter(Boolean).join(' '),
    htmlFor: fid
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "ar-select__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "ar-select__wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: "ar-select__ctl"
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), children || options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lbl = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("span", {
    className: "ar-select__chev"
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/product/AINote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Arateko · AINote — a "Zona de IA". A IA amplia; o humano decide. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-ainote{
    display:flex;align-items:flex-start;gap:var(--space-3);
    background:var(--ai-bg);border:1px solid var(--ai-border);
    border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);font-family:var(--font-sans);
  }
  .ar-ainote--quiet{background:transparent;border-style:dashed}
  .ar-ainote__tag{
    flex:0 0 auto;display:inline-flex;align-items:center;gap:.35em;
    font-size:var(--fs-3xs);font-weight:var(--fw-semibold);letter-spacing:var(--ls-wide);
    color:var(--ai-text);background:var(--white);border:1px solid var(--ai-border);
    border-radius:var(--radius-pill);padding:.22em .6em;margin-top:.05rem;
  }
  .ar-ainote__tag::before{content:"";width:.45em;height:.45em;border-radius:50%;background:var(--ai-text)}
  .ar-ainote__body{flex:1;min-width:0;font-size:var(--fs-sm);line-height:var(--lh-normal);color:var(--slate-700)}
  .ar-ainote__body b{color:var(--text-strong)}
  .ar-ainote__actions{display:flex;gap:var(--space-2);margin-top:var(--space-2);flex-wrap:wrap}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'ainote');
  el.textContent = css;
  document.head.appendChild(el);
}
function AINote({
  label = 'IA',
  quiet = false,
  actions = null,
  children,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = ['ar-ainote', quiet ? 'ar-ainote--quiet' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ar-ainote__tag"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "ar-ainote__body"
  }, children, actions && /*#__PURE__*/React.createElement("div", {
    className: "ar-ainote__actions"
  }, actions)));
}
Object.assign(__ds_scope, { AINote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/AINote.jsx", error: String((e && e.message) || e) }); }

// components/product/DecisionLog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function DecisionLog({
  entries = [],
  // [{gate, decision, options, who, action}]
  className = '',
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("table", _extends({
    className: ['ar-log', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Gate"), /*#__PURE__*/React.createElement("th", null, "Decis\xE3o"), /*#__PURE__*/React.createElement("th", null, "Op\xE7\xF5es consideradas"), /*#__PURE__*/React.createElement("th", null, "Quem"), /*#__PURE__*/React.createElement("th", null, "IA"))), /*#__PURE__*/React.createElement("tbody", null, entries.map((e, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "ar-log__gate"
  }, "GATE ", e.gate), /*#__PURE__*/React.createElement("td", {
    className: "ar-log__dec"
  }, e.decision), /*#__PURE__*/React.createElement("td", null, e.options || '—'), /*#__PURE__*/React.createElement("td", {
    className: "ar-log__who"
  }, e.who), /*#__PURE__*/React.createElement("td", null, e.action && /*#__PURE__*/React.createElement("span", {
    className: `ar-log__act ar-log__act--${e.action}`
  }, e.action === 'confirmou' ? 'confirmou' : 'sobrescreveu'))))));
}
Object.assign(__ds_scope, { DecisionLog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/DecisionLog.jsx", error: String((e && e.message) || e) }); }

// components/product/GateBanner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Arateko · GateBanner — o momento de decisão humana. O âmbar é o farol. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-gate{
    display:flex;align-items:flex-start;gap:var(--space-3);
    background:var(--gate-bg);border:1px solid var(--gate-border);
    border-radius:var(--radius-md);padding:var(--space-4);font-family:var(--font-sans);
  }
  .ar-gate__beacon{
    flex:0 0 auto;width:34px;height:34px;border-radius:50%;
    background:radial-gradient(circle at 50% 38%,var(--beacon-core),var(--amber-400) 70%);
    box-shadow:0 0 0 4px color-mix(in srgb,var(--amber-400) 18%,transparent);
    display:flex;align-items:center;justify-content:center;
    font-family:var(--font-mono);font-weight:600;font-size:var(--fs-xs);color:#5c3c16;
  }
  .ar-gate__main{flex:1;min-width:0}
  .ar-gate__id{
    font-family:var(--font-mono);font-size:var(--fs-3xs);font-weight:600;letter-spacing:.06em;
    text-transform:uppercase;color:var(--gate-text);
  }
  .ar-gate__title{font:var(--text-subheading);color:var(--text-strong);margin:.15rem 0 .25rem}
  .ar-gate__desc{font-size:var(--fs-sm);line-height:var(--lh-normal);color:var(--amber-800);margin:0}
  .ar-gate__desc b{color:var(--text-strong)}
  .ar-gate__actions{display:flex;gap:var(--space-2);margin-top:var(--space-3);flex-wrap:wrap;align-items:center}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'gate');
  el.textContent = css;
  document.head.appendChild(el);
}
function GateBanner({
  gate = 1,
  title = 'Decisão humana',
  description = null,
  actions = null,
  children,
  className = '',
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ar-gate', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "ar-gate__beacon"
  }, gate), /*#__PURE__*/React.createElement("div", {
    className: "ar-gate__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ar-gate__id"
  }, "GATE ", gate, " \xB7 aval humano"), /*#__PURE__*/React.createElement("div", {
    className: "ar-gate__title"
  }, title), description && /*#__PURE__*/React.createElement("p", {
    className: "ar-gate__desc"
  }, description), children, actions && /*#__PURE__*/React.createElement("div", {
    className: "ar-gate__actions"
  }, actions)));
}
Object.assign(__ds_scope, { GateBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/GateBanner.jsx", error: String((e && e.message) || e) }); }

// components/product/OptionCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function OptionCard({
  title,
  body = null,
  source = null,
  // 'ia' | 'humano'
  rank = null,
  tags = [],
  selected = false,
  onClick = null,
  className = '',
  ...rest
}) {
  ensureStyles();
  const cls = ['ar-opt', onClick ? 'ar-opt--clickable' : '', selected ? 'ar-opt--selected' : '', className].filter(Boolean).join(' ');
  const hasTop = source || rank;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls,
    onClick: onClick
  }, rest), hasTop && /*#__PURE__*/React.createElement("div", {
    className: "ar-opt__top"
  }, source && /*#__PURE__*/React.createElement("span", {
    className: `ar-opt__src ar-opt__src--${source}`
  }, source === 'ia' ? 'IA' : 'humano'), rank != null && /*#__PURE__*/React.createElement("span", {
    className: "ar-opt__rank"
  }, rank)), /*#__PURE__*/React.createElement("div", {
    className: "ar-opt__title"
  }, title), body && /*#__PURE__*/React.createElement("p", {
    className: "ar-opt__body"
  }, body), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ar-opt__tags"
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "ar-opt__tag"
  }, t))));
}
Object.assign(__ds_scope, { OptionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/OptionCard.jsx", error: String((e && e.message) || e) }); }

// components/product/PhaseStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Arateko · PhaseStepper — progresso pelo Funil de Valor (5 fases + marcadores de gate). */
const PHASES = ['Enquadrar', 'Expandir', 'Ranquear', 'Convergir', 'Operar'];
const GATE_AT = {
  0: 1,
  2: 2,
  3: 3,
  4: 4
}; // fase index → nº do gate humano

let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-stepper{display:flex;align-items:flex-start;gap:0;font-family:var(--font-sans);width:100%}
  .ar-step{flex:1;display:flex;flex-direction:column;align-items:center;gap:.55rem;position:relative;min-width:0}
  .ar-step__track{position:relative;width:100%;display:flex;align-items:center;justify-content:center;height:14px}
  .ar-step__line{position:absolute;top:50%;height:2px;background:var(--border);transform:translateY(-50%)}
  .ar-step__line--l{left:0;right:50%}
  .ar-step__line--r{left:50%;right:0}
  .ar-step__line--done{background:var(--amber-300)}
  .ar-step__dot{
    width:14px;height:14px;border-radius:50%;background:var(--white);
    border:2px solid var(--border-strong);position:relative;z-index:1;
    transition:all var(--dur-base) var(--ease-out);
  }
  .ar-step--done .ar-step__dot{background:var(--amber-400);border-color:var(--amber-400)}
  .ar-step--current .ar-step__dot{
    background:var(--amber-400);border-color:var(--amber-400);
    box-shadow:0 0 0 4px color-mix(in srgb,var(--amber-400) 22%,transparent);
  }
  .ar-step__label{font-size:var(--fs-xs);font-weight:var(--fw-semibold);color:var(--text-hint);text-align:center;line-height:1.2}
  .ar-step--done .ar-step__label,.ar-step--current .ar-step__label{color:var(--text-strong)}
  .ar-step__num{font-family:var(--font-mono);font-size:var(--fs-3xs);color:var(--text-hint);letter-spacing:.02em}
  .ar-step__gate{
    margin-top:.1rem;font-family:var(--font-mono);font-size:9px;font-weight:600;letter-spacing:.04em;
    color:var(--gate-text);background:var(--gate-bg);border:1px solid var(--gate-border);
    border-radius:var(--radius-pill);padding:.05rem .4rem;
  }
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'stepper');
  el.textContent = css;
  document.head.appendChild(el);
}
function PhaseStepper({
  phases = PHASES,
  current = 0,
  showGates = true,
  showNumbers = true,
  className = '',
  ...rest
}) {
  ensureStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['ar-stepper', className].filter(Boolean).join(' ')
  }, rest), phases.map((p, i) => {
    const state = i < current ? 'done' : i === current ? 'current' : 'todo';
    const gate = showGates ? GATE_AT[i] : null;
    return /*#__PURE__*/React.createElement("div", {
      key: p,
      className: `ar-step ar-step--${state}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "ar-step__track"
    }, i > 0 && /*#__PURE__*/React.createElement("span", {
      className: `ar-step__line ar-step__line--l ${i <= current ? 'ar-step__line--done' : ''}`
    }), i < phases.length - 1 && /*#__PURE__*/React.createElement("span", {
      className: `ar-step__line ar-step__line--r ${i < current ? 'ar-step__line--done' : ''}`
    }), /*#__PURE__*/React.createElement("span", {
      className: "ar-step__dot"
    })), showNumbers && /*#__PURE__*/React.createElement("span", {
      className: "ar-step__num"
    }, `0${i + 1}`), /*#__PURE__*/React.createElement("span", {
      className: "ar-step__label"
    }, p), gate && /*#__PURE__*/React.createElement("span", {
      className: "ar-step__gate"
    }, "GATE ", gate));
  }));
}
Object.assign(__ds_scope, { PhaseStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/PhaseStepper.jsx", error: String((e && e.message) || e) }); }

// components/product/ScoreTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Arateko · ScoreTable — a matriz MCDA. A IA pontua; os Decisores são donos dos pesos. */
let _injected = false;
function ensureStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ar-mcda{width:100%;border-collapse:collapse;font-family:var(--font-mono);font-size:var(--fs-xs);color:var(--text)}
  .ar-mcda th,.ar-mcda td{border:1px solid var(--border);padding:.5rem .65rem;text-align:center}
  .ar-mcda thead th{background:var(--surface-sub);color:var(--text-muted);font-weight:600;font-size:var(--fs-2xs)}
  .ar-mcda__opt{text-align:left;font-family:var(--font-sans);font-weight:600;color:var(--text-strong);white-space:nowrap}
  .ar-mcda__crit{font-weight:600}
  .ar-mcda__w{display:block;font-size:9px;color:var(--gate-text);font-weight:600;margin-top:.1rem}
  .ar-mcda__score{font-weight:600;color:var(--text-strong);background:var(--surface-sub)}
  .ar-mcda__rank{font-family:var(--font-sans);font-size:9px;color:var(--text-hint);font-weight:600;text-transform:uppercase;letter-spacing:.04em;display:block}
  .ar-mcda tr.is-winner td{background:color-mix(in srgb,var(--positive-bg) 70%,white)}
  .ar-mcda tr.is-winner .ar-mcda__opt{color:var(--positive)}
  .ar-mcda__win{font-family:var(--font-sans);font-size:9px;font-weight:700;color:var(--positive);text-transform:uppercase;letter-spacing:.06em}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-ar', 'mcda');
  el.textContent = css;
  document.head.appendChild(el);
}
function weighted(scores, criteria) {
  let sum = 0,
    wsum = 0;
  scores.forEach((s, i) => {
    const w = criteria[i] && criteria[i].weight || 0;
    sum += s * w;
    wsum += w;
  });
  return wsum ? sum / wsum : 0;
}
function ScoreTable({
  criteria = [],
  // [{label, weight, rank?}]
  options = [],
  // [{name, scores:[]}]
  showScore = true,
  highlightWinner = true,
  className = '',
  ...rest
}) {
  ensureStyles();
  const scored = options.map(o => ({
    ...o,
    _score: weighted(o.scores || [], criteria)
  }));
  const max = Math.max(...scored.map(o => o._score), 0);
  return /*#__PURE__*/React.createElement("table", _extends({
    className: ['ar-mcda', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "ar-mcda__opt"
  }, "Op\xE7\xE3o \\ Crit\xE9rio"), criteria.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    className: "ar-mcda__crit"
  }, c.rank && /*#__PURE__*/React.createElement("span", {
    className: "ar-mcda__rank"
  }, c.rank), c.label, /*#__PURE__*/React.createElement("span", {
    className: "ar-mcda__w"
  }, c.weight, "%"))), showScore && /*#__PURE__*/React.createElement("th", null, "Score"))), /*#__PURE__*/React.createElement("tbody", null, scored.map((o, ri) => {
    const isWin = highlightWinner && showScore && o._score === max && max > 0;
    return /*#__PURE__*/React.createElement("tr", {
      key: ri,
      className: isWin ? 'is-winner' : ''
    }, /*#__PURE__*/React.createElement("td", {
      className: "ar-mcda__opt"
    }, o.name, isWin && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", /*#__PURE__*/React.createElement("span", {
      className: "ar-mcda__win"
    }, "vencedora"))), (o.scores || []).map((s, ci) => /*#__PURE__*/React.createElement("td", {
      key: ci
    }, s.toFixed(1))), showScore && /*#__PURE__*/React.createElement("td", {
      className: "ar-mcda__score"
    }, o._score.toFixed(2)));
  })));
}
Object.assign(__ds_scope, { ScoreTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/product/ScoreTable.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copilot/app.jsx
try { (() => {
/* Arateko UI kit — shell do Copilot de sessão + navegação. */
const NS = window.AratekoLabsDesignSystem_0b81f3;
const {
  PhaseStepper,
  Pill,
  Button
} = NS;
const Icon = window.ArIcon;
const AR_STEPS = [{
  key: 'onboarding',
  phase: -1,
  kicker: 'entrada',
  title: 'Onboarding do desafio'
}, {
  key: 'scope',
  phase: -1,
  kicker: 'escopo',
  title: 'Escopo & Intensidade'
}, {
  key: 'charter',
  phase: 0,
  kicker: 'fase 1 · enquadrar',
  title: 'Charter',
  gate: 1
}, {
  key: 'expand',
  phase: 1,
  kicker: 'fase 2 · expandir',
  title: 'Opções & Critérios'
}, {
  key: 'rank',
  phase: 2,
  kicker: 'fase 3 · ranquear',
  title: 'Matriz MCDA',
  gate: 2
}, {
  key: 'converge',
  phase: 3,
  kicker: 'fase 4 · convergir',
  title: 'Scorecard do Funil',
  gate: 3
}, {
  key: 'operate',
  phase: 4,
  kicker: 'fase 5 · operar',
  title: 'Plano & KPIs',
  gate: 4
}, {
  key: 'log',
  phase: 5,
  kicker: 'saída',
  title: 'Decision log'
}];
function ArAvatar({
  initials = 'MR'
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      flex: '0 0 auto',
      background: 'var(--ink-800)',
      color: 'var(--text-inverse)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '600 12px var(--font-sans)',
      letterSpacing: '.02em'
    }
  }, initials);
}
function ArTopBar({
  session
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'var(--white)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/arateko-mark-ink.png",
    alt: "",
    style: {
      height: 26,
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 19px var(--font-serif)',
      color: 'var(--text-strong)',
      letterSpacing: '.01em'
    }
  }, "Arateko"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 22,
      background: 'var(--border)',
      margin: '0 4px'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--text-body-sm)',
      color: 'var(--text-muted)'
    }
  }, session.name), /*#__PURE__*/React.createElement(Pill, {
    accent: true,
    style: {
      marginLeft: 2
    }
  }, "Sprint"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ar-label",
    style: {
      fontSize: 10
    }
  }, "Decisor"), /*#__PURE__*/React.createElement(ArAvatar, {
    initials: "MR"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-soft)',
      background: 'var(--paper-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      padding: '14px 24px 16px'
    }
  }, /*#__PURE__*/React.createElement(PhaseStepper, {
    current: session.phase
  }))));
}
function ArFooter({
  step,
  idx,
  onBack,
  onNext,
  nextLabel,
  nextVariant,
  canBack
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: 'sticky',
      bottom: 0,
      background: 'color-mix(in srgb, var(--paper) 86%, transparent)',
      backdropFilter: 'blur(6px)',
      borderTop: '1px solid var(--border)',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onBack,
    disabled: !canBack,
    leftIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-left",
      size: 16
    })
  }, "Voltar"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      font: 'var(--text-meta)',
      color: 'var(--text-hint)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "git-fork",
    size: 13
  }), " loop-back dispon\xEDvel se um crit\xE9rio eliminar todas as op\xE7\xF5es"), onNext && /*#__PURE__*/React.createElement(Button, {
    variant: nextVariant || 'primary',
    onClick: onNext,
    rightIcon: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, nextLabel || 'Continuar')));
}
function ArApp() {
  const [idx, setIdx] = React.useState(0);
  const [session, setSession] = React.useState({
    name: 'Priorização do roadmap Q3',
    phase: -1,
    challenge: '',
    intensity: 'Sprint',
    gates: {}
  });
  const step = AR_STEPS[idx];
  React.useEffect(() => {
    setSession(s => ({
      ...s,
      phase: step.phase
    }));
    if (typeof window !== 'undefined') window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [idx]);
  const go = n => setIdx(Math.max(0, Math.min(AR_STEPS.length - 1, n)));
  const next = () => go(idx + 1);
  const back = () => go(idx - 1);
  const approveGate = n => setSession(s => ({
    ...s,
    gates: {
      ...s.gates,
      [n]: true
    }
  }));
  const Screen = window.ArScreens[step.key];
  const ctx = {
    session,
    setSession,
    next,
    back,
    goTo: go,
    idx,
    step,
    approveGate
  };

  // gates exigem aprovação antes de avançar
  const gateBlocked = step.gate && !session.gates[step.gate];
  const nextLabel = idx === AR_STEPS.length - 1 ? null : step.gate ? gateBlocked ? 'Aprove o gate para seguir' : 'Continuar' : 'Continuar';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--paper)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(ArTopBar, {
    session: session
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1040,
      margin: '0 auto',
      padding: '30px 24px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ar-label"
  }, step.kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: 'var(--text-title)',
      color: 'var(--text-strong)',
      margin: '6px 0 0'
    }
  }, step.title)), Screen ? /*#__PURE__*/React.createElement(Screen, ctx) : /*#__PURE__*/React.createElement("p", null, "Tela em constru\xE7\xE3o."))), /*#__PURE__*/React.createElement(ArFooter, {
    step: step,
    idx: idx,
    canBack: idx > 0,
    onBack: back,
    onNext: idx === AR_STEPS.length - 1 ? null : next,
    nextLabel: nextLabel,
    nextVariant: step.gate && !gateBlocked ? 'primary' : 'primary'
  }));
}
window.ArApp = ArApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copilot/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copilot/icons.jsx
try { (() => {
/* Arateko UI kit — ícones (geometria derivada do Lucide, https://lucide.dev).
   Substituição sinalizada: nenhum icon set de marca foi fornecido. */
const AR_ICON_PATHS = {
  'arrow-right': 'M5 12h14 M12 5l7 7-7 7',
  'arrow-left': 'M19 12H5 M12 19l-7-7 7-7',
  check: 'M20 6L9 17l-5-5',
  sparkles: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3 M19 4v3 M5 17v3 M20.5 5.5h-3 M6.5 18.5h-3',
  paperclip: 'M21.4 11.05l-8.5 8.49a5 5 0 01-7.07-7.07l8.49-8.49a3.33 3.33 0 014.71 4.71l-8.49 8.49a1.67 1.67 0 01-2.36-2.36l7.79-7.78',
  layers: 'M12 2l9 5-9 5-9-5 9-5 M3 12l9 5 9-5 M3 17l9 5 9-5',
  scale: 'M12 3v18 M7 7l-4 7h8l-4-7 M17 7l-4 7h8l-4-7 M5 21h14',
  target: 'M12 12m-9 0a9 9 0 1018 0 9 9 0 10-18 0 M12 12m-5 0a5 5 0 1010 0 5 5 0 10-10 0 M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0',
  'file-text': 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M9 13h6 M9 17h6',
  'shield-check': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  plus: 'M12 5v14 M5 12h14',
  'git-fork': 'M12 12v6 M6 3a3 3 0 100 6 3 3 0 000-6z M18 3a3 3 0 100 6 3 3 0 000-6z M12 12a6 6 0 00-6-6 M12 12a6 6 0 016-6 M12 18a3 3 0 100 6 3 3 0 000-6z',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
  gauge: 'M12 14l4-4 M3.34 19a10 10 0 1117.32 0z',
  clock: 'M12 12m-9 0a9 9 0 1018 0 9 9 0 10-18 0 M12 7v5l3 2',
  flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7'
};
function ArIcon({
  name,
  size = 18,
  stroke = 1.75,
  className = '',
  style = {}
}) {
  const d = AR_ICON_PATHS[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flex: '0 0 auto',
      ...style
    }
  }, d.split(' M').map((seg, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: (i ? 'M' : '') + seg
  })));
}
window.ArIcon = ArIcon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copilot/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copilot/screens-early.jsx
try { (() => {
/* Arateko UI kit — telas iniciais: Onboarding · Escopo · Charter (GATE 1). */
(function () {
  const NS = window.AratekoLabsDesignSystem_0b81f3;
  const {
    Card,
    Field,
    Select,
    Pill,
    Badge,
    Button,
    AINote,
    GateBanner
  } = NS;
  const Icon = window.ArIcon;
  window.ArScreens = window.ArScreens || {};
  const Grid = ({
    cols = 2,
    gap = 16,
    children,
    style
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      ...style
    }
  }, children);
  const Lbl = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    className: "ar-label",
    style: {
      marginBottom: 8
    }
  }, children);
  function Tile({
    icon,
    title,
    sub
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: '16px',
        border: '1px dashed var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-sub)',
        color: 'var(--text-muted)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent-strong)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 20
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 var(--fs-sm)/1.3 var(--font-sans)',
        color: 'var(--text-strong)'
      }
    }, title), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-meta)'
      }
    }, sub));
  }

  /* ── Onboarding ──────────────────────────────────────────── */
  window.ArScreens.onboarding = function Onboarding({
    session,
    setSession
  }) {
    const sugg = ['Como priorizar onde investir o próximo trimestre de produto?', 'Que apostas de produto maximizam retenção em 2 trimestres?'];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Card, {
      elevation: "raised"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Qual \xE9 o desafio?",
      multiline: true,
      rows: 3,
      placeholder: "Ex.: Como priorizar onde investir o pr\xF3ximo trimestre de produto?",
      value: session.challenge,
      onChange: e => setSession(s => ({
        ...s,
        challenge: e.target.value
      }))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Grid, {
      cols: 3
    }, /*#__PURE__*/React.createElement(Tile, {
      icon: "paperclip",
      title: "Anexar contexto",
      sub: "doc, planilha, link"
    }), /*#__PURE__*/React.createElement(Tile, {
      icon: "layers",
      title: "Exemplos de desafio",
      sub: "templates prontos"
    }), /*#__PURE__*/React.createElement(Tile, {
      icon: "file-text",
      title: "Importar de um doc",
      sub: "cole um brief existente"
    })))), /*#__PURE__*/React.createElement(AINote, {
      actions: sugg.map((q, i) => /*#__PURE__*/React.createElement(Button, {
        key: i,
        variant: "ai",
        size: "sm",
        onClick: () => setSession(s => ({
          ...s,
          challenge: q
        }))
      }, `Usar sugestão ${i + 1} ↗`))
    }, /*#__PURE__*/React.createElement("b", null, "Zona de IA:"), " os agentes sugerem reformula\xE7\xF5es do desafio e exemplos. Voc\xEA escolhe \u2014 nenhuma decis\xE3o de valor aqui."));
  };

  /* ── Escopo & Intensidade (4Ms) ──────────────────────────── */
  function Meter({
    label,
    value
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-body-sm)',
        color: 'var(--text)'
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-mono)',
        color: 'var(--text-muted)'
      }
    }, value, "/5")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 7,
        borderRadius: 4,
        background: 'var(--surface-sunken)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${value / 5 * 100}%`,
        height: '100%',
        background: 'var(--amber-300)',
        borderRadius: 4
      }
    })));
  }
  window.ArScreens.scope = function Scope({
    session,
    setSession
  }) {
    const dims = [['Ambiguidade', 4], ['Nº de opções', 3], ['Stakeholders', 4], ['Risco', 3], ['Horizonte', 2]];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      style: {
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Complexidade",
      meta: "5 dimens\xF5es"
    }, dims.map(([l, v]) => /*#__PURE__*/React.createElement(Meter, {
      key: l,
      label: l,
      value: v
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "Or\xE7amento de recursos",
      meta: "4Ms"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16
      }
    }, ['Manpower', 'Minutes', 'Money', 'Motivation'].map(m => /*#__PURE__*/React.createElement(Pill, {
      key: m
    }, m))), /*#__PURE__*/React.createElement(Select, {
      label: "Intensidade da sess\xE3o (gear)",
      options: ['Sprint', 'Journey', 'Method', 'Meta'],
      value: session.intensity,
      onChange: e => setSession(s => ({
        ...s,
        intensity: e.target.value
      }))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        padding: '12px 14px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--accent-soft)',
        border: '1px solid var(--gate-border)',
        font: 'var(--text-body-sm)',
        color: 'var(--amber-800)'
      }
    }, "Recomenda\xE7\xE3o dos agentes: ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)'
      }
    }, "Sprint"), " \u2014 alta ambiguidade, or\xE7amento enxuto."))), /*#__PURE__*/React.createElement(AINote, null, "A IA pontua a complexidade e recomenda a intensidade; o ", /*#__PURE__*/React.createElement("b", null, "facilitador confirma o gear"), "."));
  };

  /* ── Charter — Enquadrar (GATE 1) ────────────────────────── */
  window.ArScreens.charter = function Charter({
    session,
    approveGate
  }) {
    const approved = !!session.gates[1];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      style: {
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "DNA do desafio",
      meta: "artefato"
    }, /*#__PURE__*/React.createElement(Lbl, null, "Desafio"), /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--text-body)',
        margin: '0 0 14px',
        color: 'var(--text)'
      }
    }, session.challenge || 'Como priorizar onde investir o próximo trimestre de produto?'), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      gap: 14
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Objetivo"), /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--text-body-sm)',
        margin: 0,
        color: 'var(--text-muted)'
      }
    }, "Dobrar a reten\xE7\xE3o em 2 trimestres.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lbl, null, "Restri\xE7\xF5es"), /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--text-body-sm)',
        margin: 0,
        color: 'var(--text-muted)'
      }
    }, "Sem novo headcount; 1 sprint."))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(Lbl, null, "KPIs (curto / longo)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      accent: true
    }, "Reten\xE7\xE3o D30 +8pp"), /*#__PURE__*/React.createElement(Pill, {
      accent: true
    }, "NRR 115%")))), /*#__PURE__*/React.createElement(Card, {
      title: "Stakeholders",
      meta: "influ\xEAncia \xD7 interesse"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 13
      }),
      selected: true
    }, "Decisores"), /*#__PURE__*/React.createElement(Pill, null, "Produto"), /*#__PURE__*/React.createElement(Pill, null, "Growth"), /*#__PURE__*/React.createElement(Pill, null, "Vendas"), /*#__PURE__*/React.createElement(Pill, null, "Clientes-chave")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 150,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 29px,var(--border-soft) 29px,var(--border-soft) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,var(--border-soft) 29px,var(--border-soft) 30px)',
        position: 'relative'
      }
    }, [['Decisores', '70%', '22%'], ['Produto', '40%', '55%'], ['Clientes', '78%', '60%']].map(([n, x, y]) => /*#__PURE__*/React.createElement("span", {
      key: n,
      style: {
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%,-50%)',
        font: '600 11px var(--font-sans)',
        color: 'var(--text-strong)',
        background: 'var(--white)',
        border: '1px solid var(--border-strong)',
        borderRadius: 999,
        padding: '2px 8px'
      }
    }, n))))), /*#__PURE__*/React.createElement(GateBanner, {
      gate: 1,
      title: "Aprove o DNA do desafio e os KPIs",
      description: /*#__PURE__*/React.createElement(React.Fragment, null, "Nada avan\xE7a sem o DNA do desafio e os KPIs aprovados. Este \xE9 o ", /*#__PURE__*/React.createElement("b", null, "primeiro julgamento de valor"), "."),
      actions: approved ? /*#__PURE__*/React.createElement(Badge, {
        tone: "positive"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 12
      }), " Charter aprovado") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "accent",
        size: "sm",
        leftIcon: /*#__PURE__*/React.createElement(Icon, {
          name: "shield-check",
          size: 15
        }),
        onClick: () => approveGate(1)
      }, "Aprovar charter"), /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        size: "sm"
      }, "Editar"))
    }));
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copilot/screens-early.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copilot/screens-late.jsx
try { (() => {
/* Arateko UI kit — telas finais: Operar (GATE 4) · Decision log. */
(function () {
  const NS = window.AratekoLabsDesignSystem_0b81f3;
  const {
    Card,
    Pill,
    Badge,
    Button,
    AINote,
    GateBanner,
    DecisionLog
  } = NS;
  const Icon = window.ArIcon;
  window.ArScreens = window.ArScreens || {};
  const Grid = ({
    cols = 2,
    gap = 16,
    children,
    style
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      ...style
    }
  }, children);

  /* ── Operar — plano & KPIs (GATE 4) ──────────────────────── */
  function PlanTile({
    icon,
    title,
    lines
  }) {
    return /*#__PURE__*/React.createElement(Card, {
      elevation: "raised",
      radius: "md"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent-strong)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 var(--fs-sm) var(--font-sans)',
        color: 'var(--text-strong)'
      }
    }, title)), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 7
      }
    }, lines.map((l, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: 'flex',
        gap: 7,
        font: 'var(--text-body-sm)',
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--accent)',
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13
    })), l))));
  }
  window.ArScreens.operate = function Operate({
    session,
    approveGate
  }) {
    const approved = !!session.gates[4];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Grid, {
      cols: 3
    }, /*#__PURE__*/React.createElement(PlanTile, {
      icon: "file-text",
      title: "5W2H \u2014 a\xE7\xF5es + donos",
      lines: ['Definir telas de ativação · MR', 'Integrar eventos · JS', 'Piloto com 8 contas · TP']
    }), /*#__PURE__*/React.createElement(PlanTile, {
      icon: "layers",
      title: "Modelo de neg\xF3cio",
      lines: ['Proposta: time-to-value', 'Canais: PLG + CS', 'Receita: expansão NRR']
    }), /*#__PURE__*/React.createElement(PlanTile, {
      icon: "gauge",
      title: "KPIs vivos",
      lines: ['Retenção D30 · baseline 41%', 'Meta: +8pp em 2 trim.', 'Cadência: semanal']
    })), /*#__PURE__*/React.createElement(Card, {
      sunken: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 18,
      style: {
        color: 'var(--accent-strong)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-body-sm)',
        color: 'var(--text-muted)'
      }
    }, "Revalida\xE7\xE3o dos 4Ms (teste de realidade):"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      accent: true
    }, "Manpower \u2713"), /*#__PURE__*/React.createElement(Pill, {
      accent: true
    }, "Minutes \u2713"), /*#__PURE__*/React.createElement(Pill, {
      accent: true
    }, "Money \u2713"), /*#__PURE__*/React.createElement(Pill, null, "Motivation ?")))), /*#__PURE__*/React.createElement(AINote, {
      quiet: true
    }, "Se os 4Ms reprovarem aqui, o fluxo faz ", /*#__PURE__*/React.createElement("b", null, "loop-back"), " \xE0 fase anterior \u2014 a IA sinaliza; o humano decide voltar."), /*#__PURE__*/React.createElement(GateBanner, {
      gate: 4,
      title: "Go / no-go + or\xE7amento",
      description: /*#__PURE__*/React.createElement(React.Fragment, null, "O go/no-go e o or\xE7amento ficam humanos. Este \xE9 o \xFAltimo gate antes da execu\xE7\xE3o."),
      actions: approved ? /*#__PURE__*/React.createElement(Badge, {
        tone: "positive"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 12
      }), " Aprovado para execu\xE7\xE3o") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "accent",
        size: "sm",
        leftIcon: /*#__PURE__*/React.createElement(Icon, {
          name: "flag",
          size: 15
        }),
        onClick: () => approveGate(4)
      }, "Dar o go"), /*#__PURE__*/React.createElement(Button, {
        variant: "danger",
        size: "sm"
      }, "No-go"))
    }));
  };

  /* ── Decision log ────────────────────────────────────────── */
  window.ArScreens.log = function DecisionLogScreen({
    session
  }) {
    const g = session.gates || {};
    const entries = [{
      gate: 1,
      decision: 'DNA + KPIs',
      options: '—',
      who: 'Decisor',
      action: g[1] ? 'confirmou' : undefined
    }, {
      gate: 2,
      decision: 'Pesos dos critérios',
      options: '4 critérios',
      who: 'Decisores',
      action: g[2] ? 'sobrescreveu' : undefined
    }, {
      gate: 3,
      decision: 'Vencedora',
      options: '3 soluções',
      who: 'Facilitador',
      action: g[3] ? 'confirmou' : undefined
    }, {
      gate: 4,
      decision: 'Go / no-go',
      options: '—',
      who: 'Decisor',
      action: g[4] ? 'confirmou' : undefined
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Trilha audit\xE1vel",
      meta: "o que \xB7 op\xE7\xF5es \xB7 quem \xB7 IA"
    }, /*#__PURE__*/React.createElement(DecisionLog, {
      entries: entries
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      leftIcon: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 15
      })
    }, "Exportar PDF"), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-meta)',
        color: 'var(--text-hint)'
      }
    }, "O moat: mem\xF3ria de decis\xF5es + auditoria \u2014 melhora a cada rodada."))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '18px 20px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--brand-bg)',
        color: 'var(--brand-text)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/arateko-mark.png",
      alt: "",
      style: {
        height: 46,
        opacity: .95
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: '500 var(--fs-lg) var(--font-serif)',
        color: 'var(--lav-100)'
      }
    }, "Decis\xE3o capturada."), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-meta)',
        color: 'var(--brand-muted)'
      }
    }, "Da ambiguidade \xE0 decis\xE3o \u2014 assistida por agentes, decidida por humanos."))));
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copilot/screens-late.jsx", error: String((e && e.message) || e) }); }

// ui_kits/copilot/screens-mid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Arateko UI kit — telas centrais: Expandir · Ranquear (GATE 2) · Convergir (GATE 3). */
(function () {
  const NS = window.AratekoLabsDesignSystem_0b81f3;
  const {
    Card,
    Pill,
    Badge,
    Button,
    AINote,
    GateBanner,
    OptionCard,
    ScoreTable
  } = NS;
  const Icon = window.ArIcon;
  window.ArScreens = window.ArScreens || {};
  const Grid = ({
    cols = 2,
    gap = 16,
    children,
    style
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap,
      ...style
    }
  }, children);

  /* ── Expandir — opções E critérios em paralelo ───────────── */
  window.ArScreens.expand = function Expand() {
    const opcoes = [{
      source: 'humano',
      title: 'Onboarding assistido por IA',
      body: 'Reduzir o tempo até o primeiro valor.',
      tags: ['ativação']
    }, {
      source: 'ia',
      title: 'Programa de indicações',
      body: 'Usuários ativos trazem times.',
      tags: ['crescimento', 'baixo custo']
    }, {
      source: 'ia',
      title: 'Planos por uso (usage-based)',
      body: 'Alinhar preço a valor entregue.',
      tags: ['receita']
    }];
    const criterios = [{
      source: 'humano',
      title: 'Impacto na retenção',
      rank: 'rank 1'
    }, {
      source: 'humano',
      title: 'Esforço de engenharia',
      rank: 'rank 2'
    }, {
      source: 'ia',
      title: 'Risco de execução',
      rank: 'rank 3'
    }, {
      source: 'ia',
      title: 'Fit com a estratégia',
      rank: 'rank 4'
    }];
    const Col = ({
      title,
      items,
      addLabel
    }) => /*#__PURE__*/React.createElement(Card, {
      title: title,
      meta: `${items.length} cartões`
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, items.map((it, i) => /*#__PURE__*/React.createElement(OptionCard, _extends({
      key: i
    }, it))), /*#__PURE__*/React.createElement(Button, {
      variant: "ai",
      size: "sm",
      fullWidth: true,
      leftIcon: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 15
      })
    }, addLabel)));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(AINote, {
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "ai",
        size: "sm",
        leftIcon: /*#__PURE__*/React.createElement(Icon, {
          name: "sparkles",
          size: 14
        })
      }, "IA: ampliar pool"), /*#__PURE__*/React.createElement(Button, {
        variant: "ai",
        size: "sm",
        leftIcon: /*#__PURE__*/React.createElement(Icon, {
          name: "layers",
          size: 14
        })
      }, "IA: de-duplicar / clusterizar"))
    }, /*#__PURE__*/React.createElement("b", null, "Disciplina-assinatura:"), " gerar ", /*#__PURE__*/React.createElement("b", null, "op\xE7\xF5es E crit\xE9rios em paralelo"), ". A IA amplia e agrupa; os humanos trazem o que importa."), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      style: {
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Col, {
      title: "Op\xE7\xF5es / solu\xE7\xF5es",
      items: opcoes,
      addLabel: "IA: gerar mais op\xE7\xF5es \u2197"
    }), /*#__PURE__*/React.createElement(Col, {
      title: "Crit\xE9rios / filtros",
      items: criterios,
      addLabel: "IA: propor crit\xE9rios \u2197"
    })));
  };

  /* ── Ranquear — matriz MCDA (GATE 2) ─────────────────────── */
  window.ArScreens.rank = function Rank({
    session,
    approveGate
  }) {
    const approved = !!session.gates[2];
    const criteria = [{
      label: 'Impacto',
      weight: 30,
      rank: 'rank 1'
    }, {
      label: 'Esforço',
      weight: 25,
      rank: 'rank 2'
    }, {
      label: 'Risco',
      weight: 25,
      rank: 'rank 3'
    }, {
      label: 'Fit',
      weight: 20,
      rank: 'rank 4'
    }];
    const options = [{
      name: 'Onboarding assistido',
      scores: [4.4, 3.6, 4.2, 4.1]
    }, {
      name: 'Indicações',
      scores: [3.2, 4.1, 3.0, 3.4]
    }, {
      name: 'Usage-based',
      scores: [3.8, 2.9, 2.8, 4.5]
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Matriz de decis\xE3o (MCDA)",
      meta: "IA pontua \xB7 Decisores pesam"
    }, /*#__PURE__*/React.createElement(ScoreTable, {
      criteria: criteria,
      options: options
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
        padding: '10px 12px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-sub)',
        border: '1px solid var(--border-soft)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "scale",
      size: 16,
      style: {
        color: 'var(--accent-strong)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: 'var(--text-body-sm)',
        color: 'var(--text-muted)'
      }
    }, "Worksheet de pesos \u2014 cada peso tem um ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)'
      }
    }, "dono (Decisor)"), "."), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Pill, null, "Impacto \xB7 MR"), /*#__PURE__*/React.createElement(Pill, null, "Esfor\xE7o \xB7 JS")))), /*#__PURE__*/React.createElement(GateBanner, {
      gate: 2,
      title: "Os Decisores s\xE3o donos dos pesos",
      description: /*#__PURE__*/React.createElement(React.Fragment, null, "A ordena\xE7\xE3o dos crit\xE9rios ", /*#__PURE__*/React.createElement("b", null, "\xE9"), " o funil. A IA prop\xF5e pesos e trade-offs; os humanos decidem."),
      actions: approved ? /*#__PURE__*/React.createElement(Badge, {
        tone: "positive"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 12
      }), " Pesos confirmados") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "accent",
        size: "sm",
        leftIcon: /*#__PURE__*/React.createElement(Icon, {
          name: "shield-check",
          size: 15
        }),
        onClick: () => approveGate(2)
      }, "Confirmar pesos"), /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        size: "sm"
      }, "Repesar"))
    }));
  };

  /* ── Convergir — Scorecard do Funil (GATE 3) ─────────────── */
  function FunnelTable() {
    const rows = [['Onboarding assistido', ['passa', 'passa', 'passa'], 'vencedora'], ['Indicações', ['passa', 'elimina', '—'], 'fora'], ['Usage-based', ['elimina', '—', '—'], 'fora']];
    const cell = v => {
      if (v === 'passa') return /*#__PURE__*/React.createElement(Badge, {
        tone: "positive"
      });
      if (v === 'elimina') return /*#__PURE__*/React.createElement(Badge, {
        tone: "negative"
      });
      return /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--text-hint)'
        }
      }, "\u2014");
    };
    return /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        font: 'var(--text-body-sm)'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Opção', 'filtro 1', 'filtro 2', 'filtro 3', 'sobrevive?'].map(h => /*#__PURE__*/React.createElement("th", {
      key: h,
      style: {
        border: '1px solid var(--border)',
        padding: '8px 10px',
        textAlign: 'left',
        background: 'var(--surface-sub)',
        font: '600 var(--fs-2xs)/1 var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: '.04em',
        color: 'var(--text-muted)'
      }
    }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(([name, cells, res]) => /*#__PURE__*/React.createElement("tr", {
      key: name,
      style: res === 'vencedora' ? {
        background: 'color-mix(in srgb,var(--positive-bg) 60%,white)'
      } : null
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        border: '1px solid var(--border)',
        padding: '8px 10px',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, name), cells.map((c, i) => /*#__PURE__*/React.createElement("td", {
      key: i,
      style: {
        border: '1px solid var(--border)',
        padding: '8px 10px'
      }
    }, cell(c))), /*#__PURE__*/React.createElement("td", {
      style: {
        border: '1px solid var(--border)',
        padding: '8px 10px',
        font: '700 var(--fs-2xs) var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: '.05em',
        color: res === 'vencedora' ? 'var(--positive)' : 'var(--text-hint)'
      }
    }, res)))));
  }
  window.ArScreens.converge = function Converge({
    session,
    approveGate
  }) {
    const approved = !!session.gates[3];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Scorecard do Funil",
      meta: "filtros aplicados em ordem de rank"
    }, /*#__PURE__*/React.createElement(FunnelTable, null)), /*#__PURE__*/React.createElement(Grid, {
      cols: 2,
      style: {
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Proposta de valor",
      meta: "artefato"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        font: 'var(--text-body)',
        margin: 0,
        color: 'var(--text)'
      }
    }, "Para ", /*#__PURE__*/React.createElement("b", null, "times de produto que perdem usu\xE1rios na 1\xAA semana"), ", o ", /*#__PURE__*/React.createElement("b", null, "Onboarding assistido por IA"), ' ', "\xE9 um copiloto de ativa\xE7\xE3o que ", /*#__PURE__*/React.createElement("b", null, "encurta o tempo at\xE9 o primeiro valor"), " \u2014 diferente de tours gen\xE9ricos, ele se adapta ao objetivo de cada conta.")), /*#__PURE__*/React.createElement(Card, {
      title: "Conceito / prot\xF3tipo",
      meta: "r\xE1pido"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-sub)',
        border: '1px dashed var(--border-strong)',
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "target",
      size: 22,
      style: {
        color: 'var(--accent-strong)'
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: '600 var(--fs-sm) var(--font-sans)',
        color: 'var(--text-strong)'
      }
    }, "Prot\xF3tipo clic\xE1vel"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: 'var(--text-meta)'
      }
    }, "hip\xF3tese \xB7 construir \xB7 testar com n=8"))))), /*#__PURE__*/React.createElement(GateBanner, {
      gate: 3,
      title: "A vencedora sobrevive ao mundo real?",
      description: /*#__PURE__*/React.createElement(React.Fragment, null, "O humano confirma que a vencedora sobrevive \u2014 n\xE3o basta vencer a matem\xE1tica do funil."),
      actions: approved ? /*#__PURE__*/React.createElement(Badge, {
        tone: "positive"
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 12
      }), " Sobreviv\xEAncia confirmada") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "accent",
        size: "sm",
        leftIcon: /*#__PURE__*/React.createElement(Icon, {
          name: "shield-check",
          size: 15
        }),
        onClick: () => approveGate(3)
      }, "Confirmar sobreviv\xEAncia"), /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        size: "sm"
      }, "Refunilar"))
    }));
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/copilot/screens-mid.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.AINote = __ds_scope.AINote;

__ds_ns.DecisionLog = __ds_scope.DecisionLog;

__ds_ns.GateBanner = __ds_scope.GateBanner;

__ds_ns.OptionCard = __ds_scope.OptionCard;

__ds_ns.PhaseStepper = __ds_scope.PhaseStepper;

__ds_ns.ScoreTable = __ds_scope.ScoreTable;

})();
