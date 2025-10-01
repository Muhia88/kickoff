export const addToWishlist = (prev, product) => {
  if (prev.find((item) => item.id === product.id)) return prev;
  return [...prev, product];
};

export const removeFromWishlist = (prev, productId) => {
  return prev.filter((item) => item.id !== productId);
};

export const isWishlisted = (wishlist, productId) => {
  return wishlist.some((item) => item.id === productId);
};