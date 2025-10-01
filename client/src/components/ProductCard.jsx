import React from 'react';
import { Heart, Star } from 'lucide-react';
import { UseCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/useWishlist';
import { Link, useNavigate } from 'react-router-dom';
import fallbackImg from '../assets/react.svg';

const formatToKES = (price) => {
  if (price === null || price === undefined || price === '') return '';

  // Accept numeric or numeric-like string values and treat them as KES already.
  const numeric = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, '')) : Number(price);
  if (Number.isNaN(numeric)) return '';

  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numeric);
};

const renderStars = (rating = 0) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={12}
      className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
    />
  ));
};

const ProductCard = ({ product }) => {
  const { addToCart, setShowCart } = UseCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const handleAdd = () => {
    const item = { ...product, quantity: 1 };
    addToCart(item);
    setShowCart(true);
  };

  const liked = isWishlisted(product.id);
  const handleWishlist = (e) => {
    e.stopPropagation();
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate to product page. Wishlist/add-to-cart handlers call stopPropagation when needed.
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="group relative cursor-pointer" onClick={handleCardClick}>
      {/* Sale Badge */}
      {product.sale && product.discount && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs px-2 py-1 font-medium rounded shadow-lg">
          Save {formatToKES(typeof product.discount === 'string' ? parseFloat(product.discount.replace('$', '')) : product.discount)}
        </div>
      )}

      {/* Wishlist */}
        <button
          className="absolute top-2 right-2 z-10 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
          onClick={handleWishlist}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} className={liked ? 'text-red-600' : 'text-gray-600'} />
        </button>

      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={product.image || product.image_url || product.imageUrl || fallbackImg}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
        />
      </div>

      <div className="space-y-2">
  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">{product.name}</h3>

        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">{renderStars(product.rating)}</div>
          {product.reviews > 0 && <span className="text-xs text-gray-500">({product.reviews})</span>}
        </div>

        <div className="flex items-center space-x-2">
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">{formatToKES(product.originalPrice)}</span>
          )}
          <span className="text-lg font-bold text-gray-900">{formatToKES(product.price || product.price_cents || product.amount)}</span>
        </div>

        <button onClick={(e) => { e.stopPropagation(); handleAdd(); }} className="w-full bg-gray-900 text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
