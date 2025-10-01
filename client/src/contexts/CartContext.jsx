import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (newItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setItems(prevItems => {
      if (quantity <= 0) return prevItems.filter(item => item.id !== itemId);
      return prevItems.map(item => item.id === itemId ? { ...item, quantity } : item);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = { items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice, showCart, setShowCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
