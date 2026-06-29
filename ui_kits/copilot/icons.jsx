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
  flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7',
};

function ArIcon({ name, size = 18, stroke = 1.75, className = '', style = {} }) {
  const d = AR_ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', ...style }}>
      {d.split(' M').map((seg, i) => <path key={i} d={(i ? 'M' : '') + seg} />)}
    </svg>
  );
}

window.ArIcon = ArIcon;
