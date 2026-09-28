import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ category }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    api
      .getProducts(category)
      .then((data) => {
        setProducts(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [category]);

  return (
    <section className="block wrap" id="catalog">
      <div className="section-head">
        <h2>{category ? category : 'Featured this week'}</h2>
        <p>
          {category
            ? `Showing everything filed under ${category}.`
            : "A pick from the counter — full catalog is larger and updates as new stock lands."}
        </p>
      </div>

      {status === 'loading' && <p className="muted-note">Loading products…</p>}
      {status === 'error' && (
        <p className="muted-note">
          Couldn't reach the store's API. Make sure the server is running on port 4000.
        </p>
      )}
      {status === 'ready' && products.length === 0 && (
        <p className="muted-note">No products in this category yet.</p>
      )}

      {status === 'ready' && products.length > 0 && (
        <div className="prod-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
