import React, { useState } from 'react';
import { UseCart } from '../../contexts/CartContext';

const Checkout = () => {
  const { items, totalPrice } = UseCart();
  const [shippingMethod, setShippingMethod] = useState('ship');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [pinnedLocation, setPinnedLocation] = useState(null);

  const shippingFee = items.length > 0 ? 199 : 0; // example flat shipping fee in KES

  const handlePinLocation = () => {
    // Placeholder: open map widget / integrate map provider to pin location.
    // For now we simulate a pinned lat/lng.
    setPinnedLocation({ lat: -1.2921, lng: 36.8219 });
  };

  const handlePayNow = () => {
    // Placeholder: integrate Paystack here. We'll just console.log and navigate in the future.
    // Real integration requires server keys and client initialization with paystack-js or SDK.
    console.log('Pay now', { items, total: totalPrice + shippingFee, pinnedLocation, phone, notes });
    alert('Pay now pressed (placeholder). Implement Paystack integration to complete payment flow.');
  };

  const totalWithShipping = totalPrice + shippingFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left: form area (scrollable) */}
        <main className="w-full md:w-2/3">
          <h1 className="text-3xl font-playfair font-bold mb-6">Checkout</h1>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Delivery</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="radio" name="shipping" checked={shippingMethod === 'ship'} onChange={() => setShippingMethod('ship')} />
                <span className="ml-2">Ship</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="shipping" checked={shippingMethod === 'pickup'} onChange={() => setShippingMethod('pickup')} />
                <span className="ml-2">Pick up</span>
              </label>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Shipping address</h2>
            <div className="space-y-3">
              <input className="w-full border rounded p-3" placeholder="Full name" />
              <input className="w-full border rounded p-3" placeholder="Address line 1" />
              <input className="w-full border rounded p-3" placeholder="Address line 2 (optional)" />
              <div className="grid grid-cols-2 gap-3">
                <input className="border rounded p-3" placeholder="City" />
                <input className="border rounded p-3" placeholder="Postal / ZIP" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <button onClick={handlePinLocation} className="inline-flex items-center px-4 py-2 bg-gray-100 border rounded">Pin location on map</button>
                  {pinnedLocation && <span className="ml-3 text-sm text-gray-500">Pinned</span>}
                </div>
                <div className="text-xs text-gray-400">Map integration placeholder</div>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Payment</h2>
            <div className="space-y-3">
              <div className="p-4 border rounded"> 
                <div className="text-sm text-gray-600 mb-2">Pay with Paystack (placeholder)</div>
                <button onClick={() => alert('Initialize Paystack here')} className="px-4 py-2 bg-yellow-400 rounded text-black">Paystack (Demo)</button>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <div className="space-y-3">
              <input className="w-full border rounded p-3" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <textarea className="w-full border rounded p-3" placeholder="Extra details (delivery notes, gate codes...)" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </section>

          <div className="mb-12">
            <button onClick={handlePayNow} className="w-full md:w-1/2 bg-red-700 text-white py-3 rounded">Pay now</button>
          </div>
        </main>

        {/* Right: order summary (sticky on desktop) */}
        <aside className="w-full md:w-1/3 mt-8 md:mt-0">
          <div className="md:sticky md:top-20 border-l md:pl-6 md:pl-8 md:ml-4 md:border-gray-200/30">
            <div className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold mb-4">Your order</h3>
              <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="text-sm text-gray-500">No items in cart</div>
                ) : (
                  items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={it.image} alt={it.name} className="w-12 h-12 object-contain bg-gray-50 rounded" />
                        <div className="text-sm">
                          <div className="font-medium">{it.name}</div>
                          <div className="text-xs text-gray-500">Qty: {it.quantity}</div>
                        </div>
                      </div>
                      <div className="text-sm">KSh { (it.price * it.quantity).toLocaleString() }</div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <div>Subtotal</div>
                  <div>KSh {totalPrice.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <div>Shipping</div>
                  <div>KSh {shippingFee.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold mt-4">
                  <div>Total</div>
                  <div>KSh {totalWithShipping.toLocaleString()}</div>
                </div>

                <div className="mt-4">
                  <button onClick={handlePayNow} className="w-full bg-red-700 text-white py-3 rounded">Pay now</button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
