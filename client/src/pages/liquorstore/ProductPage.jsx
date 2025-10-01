import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductCard from '../../components/ProductCard';
import { UseCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/useWishlist';
import fallbackImg from '../../assets/react.svg';

const formatToKES = (price) => {
  if (price === null || price === undefined || price === '') return '';
  const numeric = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, '')) : Number(price);
  if (Number.isNaN(numeric)) return '';
  return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0 }).format(numeric);
};

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setShowCart } = UseCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data.product || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Reset quantity when product changes and clamp to available stock
  useEffect(() => {
    if (!product) return;
    const max = product.stock && product.stock > 0 ? product.stock : 1;
    setQuantity((q) => Math.max(1, Math.min(max, Number(q) || 1)));
  }, [product]);

  if (loading) return <div className="p-8 text-center">Loading product...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-8 text-center">No product data.</div>;

  const handleAdd = () => {
    const qty = Math.max(1, Math.min(product.stock || Infinity, Number(quantity) || 1));
    addToCart({ ...product, quantity: qty });
    setShowCart(true);
  };

  const liked = isWishlisted(product.id);
  const handleWishlist = () => {
    if (liked) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Image */}
          <div className="bg-white p-6 rounded shadow flex items-center justify-center">
            <img
              src={product.image || product.image_url || product.imageUrl || fallbackImg}
              alt={product.name || 'product'}
              className="w-full h-[60vh] max-h-[700px] object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImg;
              }}
            />
          </div>

          {/* Right: Details */}
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-playfair font-bold mb-2">{product.name}</h1>
            <div className="mb-4 text-gray-700">{product.description}</div>

            <div className="mb-6">
              <div className="text-sm text-gray-500 line-through">{product.originalPrice && formatToKES(product.originalPrice)}</div>
              <div className="text-2xl font-bold text-gray-900">{formatToKES(product.price)}</div>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-2">Quantity</label>
              <div className="inline-flex items-center border rounded overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, Number(q) - 1))}
                  className="px-3 py-2 bg-white hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  className="w-16 text-center px-2"
                  type="number"
                  min={1}
                  max={product.stock || undefined}
                  value={quantity}
                  onChange={(e) => {
                    const val = Math.max(1, Math.min(product.stock || Infinity, Number(e.target.value) || 1));
                    setQuantity(val);
                  }}
                />
                <button
                  onClick={() => setQuantity((q) => Number(q) + 1)}
                  className="px-3 py-2 bg-white hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4 mb-6">
              <button onClick={handleAdd} disabled={!(product.stock > 0)} className="bg-gray-900 text-white px-6 py-2 rounded disabled:opacity-50" >Add to Cart</button>
              <button onClick={handleWishlist} className="flex items-center gap-2 border px-4 py-2 rounded">
                <Heart /> {liked ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            <div className="text-sm text-gray-600">{product.stock > 0 ? 'In stock' : 'Out of stock'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
