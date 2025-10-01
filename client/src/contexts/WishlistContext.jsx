import React, { useState } from 'react';
import { WishlistContext } from './wishlist-context';
import { addToWishlist as addToWishlistUtil, removeFromWishlist as removeFromWishlistUtil, isWishlisted as isWishlistedUtil } from '../utils/wishlistUtils';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => addToWishlistUtil(prev, product));
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => removeFromWishlistUtil(prev, productId));
  };

  const isWishlisted = (productId) => isWishlistedUtil(wishlist, productId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};


