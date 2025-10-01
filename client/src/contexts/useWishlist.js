import { useContext } from 'react';
import { WishlistContext } from './wishlist-context';

export const useWishlist = () => useContext(WishlistContext);