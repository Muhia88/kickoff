// ...existing code...
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';

const FeaturedItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/products?category=Featured%20Items');
        if (!res.ok) throw new Error('Failed to fetch featured products');
        const data = await res.json();
        setProducts(data.products || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="featured-items" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12 text-gray-800">
          Popular Items
        </h2>

        {loading ? (
          <div className="text-center text-gray-500">Loading featured items...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No featured items found.</div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedItems;