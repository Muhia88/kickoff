import React from 'react';
import { X } from 'lucide-react';
import { UseCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, showCart, setShowCart } = UseCart();
  const navigate = useNavigate();

  const CheckoutButton = () => {
    const handleCheckout = () => {
      const token = localStorage.getItem('token');
      setShowCart(false);
      if (!token) {
        navigate('/signin');
      } else {
        navigate('/checkout');
      }
    };

    return (
      <button onClick={handleCheckout} className="w-full bg-red-700 text-white py-3 rounded">Checkout</button>
    );
  };

  return (
    // overlay (transparent with subtle blur so page remains visible)
    <div className={`fixed inset-0 z-50 transition-opacity ${showCart ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-transparent backdrop-blur-sm transition-opacity duration-300 ${showCart ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setShowCart(false)}
      />

      {/* Sidebar */}
      <aside className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform duration-300 z-60 flex flex-col ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-2xl font-playfair font-bold">Cart</h3>
          <button onClick={() => setShowCart(false)} className="p-2 rounded-md hover:bg-gray-100">
            <X />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          {items.length === 0 ? (
            <div className="text-center text-gray-600 mt-12">Your cart is empty.</div>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                  <div key={it.id} className="flex items-center space-x-4">
                    <img src={it.image} alt={it.name} className="w-16 h-16 object-contain bg-gray-50 rounded" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{it.name}</div>
                      <div className="text-xs text-gray-500">KSh {it.price.toLocaleString()}</div>
                      <div className="mt-2 inline-flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(it.id, it.quantity - 1)}
                          className="px-3 py-1 border rounded text-sm"
                          aria-label={`Decrease quantity of ${it.name}`}
                        >
                          -
                        </button>
                        <div className="px-4 py-1 border rounded text-sm text-center w-12">{it.quantity}</div>
                        <button
                          onClick={() => updateQuantity(it.id, it.quantity + 1)}
                          className="px-3 py-1 border rounded text-sm"
                          aria-label={`Increase quantity of ${it.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => removeFromCart(it.id)} className="text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">Subtotal</div>
            <div className="text-lg font-semibold">KSh {totalPrice.toLocaleString()}</div>
          </div>

          <div className="space-y-2">
            {items.length > 0 && (
              <CheckoutButton />
            )}
            <button onClick={() => { clearCart(); setShowCart(false); }} className="w-full border py-3 rounded">Clear Cart</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Cart;
