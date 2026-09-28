import { useState } from 'react';
import Hero from '../components/Hero.jsx';
import CategoryGrid from '../components/CategoryGrid.jsx';
import ProductGrid from '../components/ProductGrid.jsx';

export default function Home() {
  const [category, setCategory] = useState(null);

  return (
    <>
      <Hero />
      <CategoryGrid onSelect={setCategory} activeCategory={category} />
      <ProductGrid category={category} />
    </>
  );
}
