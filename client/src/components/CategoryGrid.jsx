const categories = [
  {
    name: 'Interior',
    blurb: 'Seat covers, floor mats, steering wraps, headrest cushions.',
    icon: <><rect x="3" y="6" width="18" height="13" rx="1" /><path d="M3 11h18" /><path d="M8 6V4h8v2" /></>
  },
  {
    name: 'Electronics',
    blurb: 'Dash cams, phone mounts, fast chargers, reversing sensors.',
    icon: <><rect x="4" y="7" width="16" height="11" rx="2" /><circle cx="12" cy="12.5" r="3" /><path d="M8 7V5h8v2" /></>
  },
  {
    name: 'Exterior',
    blurb: 'LED light bars, mud flaps, roof racks, body trim.',
    icon: <><path d="M3 13l2-6h14l2 6" /><rect x="3" y="13" width="18" height="5" rx="1" /><circle cx="7.5" cy="18.5" r="1.4" /><circle cx="16.5" cy="18.5" r="1.4" /></>
  },
  {
    name: 'Care & Tools',
    blurb: 'Vacuum cleaners, roadside kits, air fresheners, polish.',
    icon: <path d="M14.7 6.3a4 4 0 1 0-5.4 5.4l-6 6 2 2 6-6a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z" />
  }
];

export default function CategoryGrid({ onSelect, activeCategory }) {
  return (
    <section className="block wrap" id="categories">
      <div className="section-head">
        <h2>Shop by category</h2>
        <p>Four aisles, one counter — everything organised the way our regulars already think about it.</p>
      </div>
      <div className="cat-grid">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`cat-card ${activeCategory === cat.name ? 'is-active' : ''}`}
            onClick={() => onSelect(activeCategory === cat.name ? null : cat.name)}
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {cat.icon}
            </svg>
            <h3>{cat.name}</h3>
            <p>{cat.blurb}</p>
            <span className="link">{activeCategory === cat.name ? 'Showing this category ✕' : `Browse ${cat.name} →`}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
