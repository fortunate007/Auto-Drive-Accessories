export default function Hero() {
  return (
    <>
      <section className="hero wrap">
        <div>
          <div className="eyebrow">Kirinyaga Road &middot; Nairobi</div>
          <h1 className="hero-head">
            Kitted out from the <em>heart of Kirinyaga Road</em>, delivered across East Africa.
          </h1>
          <p className="lede">
            Auto-Drive Accessories stocks interior, electronics, exterior and care essentials for
            every make on the road — sourced, fitted, and shipped from Nairobi's own accessory bay.
          </p>
          <div className="hero-actions">
            <a href="#catalog" className="btn-solid">Browse the catalog</a>
            <a href="#visit" className="btn-ghost">Get directions</a>
          </div>
        </div>

        <div>
          <div className="gauge-wrap">
            <svg viewBox="0 0 280 280" width="280" height="280" role="img" aria-label="Illustrated gauge reading full on accessories">
              <circle cx="140" cy="140" r="128" fill="none" stroke="#2A2C2F" strokeWidth="2" />
              <circle cx="140" cy="140" r="104" fill="none" stroke="#2A2C2F" strokeWidth="1" />
              <g stroke="#AEB4B9" strokeWidth="2">
                <line x1="140" y1="24" x2="140" y2="40" />
                <line x1="216" y1="46" x2="206" y2="58" />
                <line x1="256" y1="112" x2="240" y2="118" />
                <line x1="256" y1="168" x2="240" y2="162" />
                <line x1="216" y1="234" x2="206" y2="222" />
                <line x1="140" y1="256" x2="140" y2="240" />
                <line x1="64" y1="234" x2="74" y2="222" />
                <line x1="24" y1="168" x2="40" y2="162" />
                <line x1="24" y1="112" x2="40" y2="118" />
                <line x1="64" y1="46" x2="74" y2="58" />
              </g>
              <path d="M 64 46 A 104 104 0 1 1 216 46" fill="none" stroke="#E8531A" strokeWidth="6" strokeLinecap="round" />
              <g transform="rotate(35 140 140)">
                <line x1="140" y1="140" x2="140" y2="52" stroke="#F3F1EA" strokeWidth="3" strokeLinecap="round" />
              </g>
              <circle cx="140" cy="140" r="9" fill="#F3F1EA" />
              <text x="140" y="196" textAnchor="middle" fill="#AEB4B9" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">EMPTY</text>
              <text x="140" y="92" textAnchor="middle" fill="#E8531A" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2">FULLY KITTED</text>
            </svg>
          </div>
          <div className="gauge-caption">Stock gauge — reading full, as always</div>
        </div>
      </section>

      <div className="hazard" role="presentation"></div>
    </>
  );
}
