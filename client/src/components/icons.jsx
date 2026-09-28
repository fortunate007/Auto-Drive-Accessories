// Maps a product's `icon` key (set in server/src/seed.js) to an inline SVG.
// Centralised here so both the catalog and cart line items stay consistent.
const paths = {
  'floor-mats': <><rect x="3" y="8" width="18" height="10" rx="1" /><path d="M3 12h18" /></>,
  'seat-cover': <><path d="M4 18V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9" /><path d="M4 18h16v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1z" /><path d="M8 7V5h8v2" /></>,
  'dash-cam': <><rect x="6" y="4" width="12" height="16" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M9.5 17h5" /></>,
  'phone-mount': <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 6h2" /></>,
  charger: <><rect x="3" y="9" width="18" height="6" rx="3" /><path d="M8 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>,
  'light-bar': <><rect x="3" y="10" width="18" height="4" rx="1" /><path d="M6 14v3M18 14v3" /></>,
  'mud-flap': <><path d="M4 6h16l-2 12H6L4 6z" /><path d="M9 6V4h6v2" /></>,
  vacuum: <><rect x="9" y="3" width="6" height="8" rx="1" /><path d="M12 11v6" /><path d="M8 20h8" /></>,
  'tool-kit': <><rect x="3" y="9" width="18" height="10" rx="1" /><path d="M8 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>
};

export default function ProductIcon({ name, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name] || <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
