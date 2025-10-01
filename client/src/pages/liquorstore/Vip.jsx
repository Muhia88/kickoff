import { useState } from 'react';
import { X } from 'lucide-react';

const vipBenefits = [
  'Priority invites to hosted events',
  'Priority reservations',
  'Access to private events',
  'Early access to limited-edition bottles',
  'Frequent discounted prices',
  'Priority delivery with discounts',
  'Discounted merch (caps, hoodies)',
  'Loyalty points system',
  'VIP-only community groups',
];

const Vip = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [card, setCard] = useState('');
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: VIP image */}
          <div className="flex items-center justify-center">
            <img
              src="/VIP1.jpg"
              alt="VIP Experience"
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>

          {/* Right: Benefits */}
          <div>
            <h1 className="text-4xl font-playfair font-bold text-red-700 mb-4">Become a VIP Member</h1>
            <ul className="space-y-3 mb-8">
              {vipBenefits.map((benefit, i) => (
                <li key={i} className="flex items-center text-gray-800 text-lg">
                  <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-3" />
                  {benefit}
                </li>
              ))}
            </ul>
            <button
              className="bg-red-700 text-white px-8 py-3 text-lg font-bold rounded hover:bg-red-800 transition-colors duration-200 shadow-lg"
              onClick={() => setShowCheckout(true)}
            >
              Become a VIP (KSh 2,000/month)
            </button>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm backdrop-brightness-95"
            onClick={() => { setShowCheckout(false); setSuccess(false); }}
          >
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative ring-1 ring-black/5" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => { setShowCheckout(false); setSuccess(false); }}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-red-700">VIP Membership Checkout</h2>
              {success ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-2">🎉</div>
                  <div className="text-lg font-semibold text-green-600 mb-2">Payment Successful!</div>
                  <div className="text-gray-700 mb-4">Welcome to the VIP community.</div>
                  <button className="bg-red-700 text-white px-6 py-2 rounded" onClick={() => setShowCheckout(false)}>Close</button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handlePay}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      required
                      value={card}
                      onChange={e => setCard(e.target.value)}
                      className="mt-1 block w-full border rounded px-3 py-2"
                      placeholder="Card number"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={paying}
                    className="w-full bg-red-700 text-white py-3 rounded font-bold mt-4 hover:bg-red-800 transition-colors"
                  >
                    {paying ? 'Processing...' : 'Pay KSh 2,000'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vip;
