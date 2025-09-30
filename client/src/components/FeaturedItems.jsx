import { Heart, Star } from 'lucide-react';

const FeaturedItems = () => {
  // 1. Set the conversion rate from USD to KES.
  // Note: For a real app, you'd fetch this from a currency API.
  const USD_TO_KES_RATE = 130;

  /**
   * 2. Create a helper function to convert USD to KES and format it.
   * This uses the built-in Intl.NumberFormat for perfect currency formatting.
   * @param {number} priceInUSD - The price in US Dollars.
   * @returns {string} - The formatted price in Kenyan Shillings (e.g., "KSh 9,100").
   */
  const formatToKES = (priceInUSD) => {
    // Return an empty string if the price is not valid
    if (priceInUSD === null || typeof priceInUSD !== 'number') return '';

    const priceInKES = priceInUSD * USD_TO_KES_RATE;
    
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0, // Display whole numbers for KES
      maximumFractionDigits: 0,
    }).format(priceInKES);
  };

  const products = [
    {
      id: 1,
      name: "Jack Daniel's Barrel Proof Single Barrel Rye Whiskey by Early Kick-Off",
      price: 69.99,
      originalPrice: null,
      image: 'https://ext.same-assets.com/4095877370/3433335847.jpeg',
      rating: 5,
      reviews: 0,
      sale: false
    },
    {
      id: 2,
      name: "Rare Character Single Barrel Series 8 Year Old Cask Strength Rye Whiskey SEG-007",
      price: 119.99,
      originalPrice: 129.99,
      image: 'https://ext.same-assets.com/4095877370/331105913.jpeg',
      rating: 5,
      reviews: 0,
      sale: true,
      discount: '$10.00' // This will be converted on the fly
    },
    {
      id: 3,
      name: "Russell's Reserve Private Barrel Selection Bourbon Whiskey by Early Kick-Off #24-0511",
      price: 79.99,
      originalPrice: null,
      image: 'https://ext.same-assets.com/4095877370/2923094316.jpeg',
      rating: 5,
      reviews: 2,
      sale: false
    },
    {
      id: 4,
      name: "Orphan Barrel Fanged Pursuit 17 Year Old Bourbon Whiskey",
      price: 199.99,
      originalPrice: null,
      image: 'https://ext.same-assets.com/4095877370/2011620315.jpeg',
      rating: 5,
      reviews: 0,
      sale: false
    },
    {
      id: 5,
      name: "Johnnie Walker Perfect Moment Blue Label Ice Chalet",
      price: 219.99,
      originalPrice: 279.99,
      image: 'https://ext.same-assets.com/4095877370/2621073261.jpeg',
      rating: 5,
      reviews: 0,
      sale: true,
      discount: '$60.00' // This will be converted on the fly
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-playfair font-bold text-center mb-12 text-gray-800">
          Featured Items
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              {/* Sale Badge */}
              {product.sale && product.discount && (
                <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs px-2 py-1 font-medium rounded shadow-lg">
                  {/* 3. Convert the discount value */}
                  Save {formatToKES(parseFloat(product.discount.replace('$', '')))}
                </div>
              )}

              {/* Wishlist Button */}
              <button className="absolute top-2 right-2 z-10 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                <Heart size={16} className="text-gray-600 hover:text-kick-red" />
              </button>

              {/* Product Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  {product.reviews > 0 && (
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                  {/* 4. Convert the original price */}
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatToKES(product.originalPrice)}
                    </span>
                  )}
                  {/* 5. Convert the current price */}
                  <span className="text-lg font-bold text-gray-900">
                    {formatToKES(product.price)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gray-900 text-white py-2 text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;