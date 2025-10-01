import React from 'react';
import { useWishlist } from '../../contexts/useWishlist';
import ProductCard from '../../components/ProductCard';

const WishList = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-playfair font-bold mb-8 text-center">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-300 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
          <div className="text-lg text-gray-500 font-medium">You do not have any items in your wishlist yet.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
