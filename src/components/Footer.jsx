import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">SIGN UP AND SAVE</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Sign up to Early Kick-Off and get deals when they happen, exclusive offers, and be the first to know about new products and events.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-kick-red"
              />
              <button className="bg-gray-900 text-white px-6 py-2 hover:bg-gray-800 transition-colors">
                →
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">SUPPORT</h3>
            <div className="space-y-2 text-sm">
              <div>support@earlykickoff.com</div>
              <div>+254700000000</div>
              <a href="/contact" className="block text-gray-600 hover:text-kick-red">Contact Us</a>
              <a href="/faqs" className="block text-gray-600 hover:text-kick-red">FAQs</a>
              <a href="/privacy" className="block text-gray-600 hover:text-kick-red">Terms & Privacy Policy</a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4">PRODUCTS</h3>
            <div className="space-y-2 text-sm">
              <a href="/spirits" className="block text-gray-600 hover:text-kick-red">Spirits</a>
              <a href="/wine" className="block text-gray-600 hover:text-kick-red">Wine</a>
              <a href="/craft-beer" className="block text-gray-600 hover:text-kick-red">Beer</a>
              <a href="/barrel-picks" className="block text-gray-600 hover:text-kick-red">Barrel Picks</a>
              <a href="/bundles" className="block text-gray-600 hover:text-kick-red">Bundles & Gift Sets</a>
              <a href="/sodas-snacks" className="block text-gray-600 hover:text-kick-red">Sodas & Snacks</a>
              <a href="/clearance" className="block text-gray-600 hover:text-kick-red">Clearance</a>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-bold mb-4">COMMUNITY</h3>
            <div className="space-y-2 text-sm">
              <a href="/blog" className="block text-gray-600 hover:text-kick-red">Blog</a>
              <a href="/reviews" className="block text-gray-600 hover:text-kick-red">Reviews</a>
              <a href="/rewards" className="block text-gray-600 hover:text-kick-red">Early Kick-Off Rewards</a>
              <a href="/corporate" className="block text-gray-600 hover:text-kick-red">Corporate Gifting</a>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-gray-600 hover:text-kick-red transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-kick-red transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-kick-red transition-colors">
            <Twitter size={24} />
          </a>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-8">
          <h2 className="text-2xl font-playfair font-bold text-center mb-4">
            Kenya's Best Online Liquor Store
          </h2>
          <p className="text-gray-600 text-center text-sm max-w-4xl mx-auto mb-6">
            Early Kick-Off Liquor is more than just a liquor store, it's a celebration of life's moments. Whether you're toasting to a special occasion or simply unwinding after a long day, we provide the finest selection of spirits, wines, and beers to elevate your experience.
          </p>
          <p className="text-center text-sm font-medium">
            So sit back and relax - we got you covered!
          </p>

          {/* Copyright */}
          <div className="text-center mt-8 pt-6 border-t border-gray-300 text-xs text-gray-500">
            © 2025 Early Kick-Off Liquor - All Rights Reserved. WARNING: Drinking distilled spirits, beer, coolers, wine and other alcoholic beverages may increase cancer risk, and, during pregnancy, can cause birth defects.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;