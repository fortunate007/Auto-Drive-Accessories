import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Header() {
  const { totalCount, setIsOpen } = useCart();

  return (
    <header className="site-header">
      <div className="wrap nav-row">
        <Link to="/" className="plate-badge">
          <div className="plate">
            AUTO&middot;DRIVE
            <small>NAIROBI &middot; KE</small>
          </div>
          <div className="brand-name">
            Auto-Drive
            <span>Accessories Ltd</span>
          </div>
        </Link>

        <nav className="nav-links">
          <ul>
            <li><a href="/#categories">Categories</a></li>
            <li><a href="/#catalog">Catalog</a></li>
            <li><a href="/#visit">Visit</a></li>
          </ul>
        </nav>

        <button className="cart-toggle" onClick={() => setIsOpen(true)} aria-label="Open cart">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6" />
          </svg>
          {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
        </button>
      </div>
    </header>
  );
}
