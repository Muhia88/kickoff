
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductOfTheWeek = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/products?category=Featured%20Items');
        if (!res.ok) throw new Error('Failed to fetch featured products');
        const data = await res.json();
        const products = data.products || data;
        setProduct(products && products.length > 0 ? products[0] : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) {
    return <section className="py-16 bg-white"><div className="max-w-7xl mx-auto px-4"><div className="text-center text-gray-500">Loading product of the week...</div></div></section>;
  }
  if (error || !product) {
    return <section className="py-16 bg-white"><div className="max-w-7xl mx-auto px-4"><div className="text-center text-red-500">{error || 'No product of the week found.'}</div></div></section>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                TRENDING THIS WEEK
              </span>
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-800 mt-2">
                {product.name}
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <button
              className="bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              SHOP NOW
            </button>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8">
              <img
                src={product.image || product.image_url || product.imageUrl}
                alt={product.name}
                className="w-full h-auto max-w-sm mx-auto"
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/src/assets/react.svg'; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOfTheWeek;