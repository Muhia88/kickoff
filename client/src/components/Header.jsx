import { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, Heart, X } from "lucide-react";
import { UseCart } from '../contexts/CartContext';
import { UserMenu } from './UserMenu';
import kickoffLogo from "/logo/kickoff_logo.jpeg";

// 1. NEW COMPONENT: A self-contained dropdown for the mobile menu.
// It manages its own open/closed state.
// convert a display name into a URL-friendly category slug
const slugify = (name) =>
  String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const MobileLiquorStoreDropdown = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* This button toggles the dropdown's visibility */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center font-bold text-red-700 hover:text-red-800 text-base py-1"
      >
        <span>Liquor Store</span>
        {/* Chevron icon that rotates based on the open state */}
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* The collapsible content area, shown only when isOpen is true */}
      {isOpen && (
        <div className="pt-2 pl-4 space-y-3">
          {categories.map((category) => (
            <div key={category.name}>
                {category.subcategories ? (
                  <>
                    <h4 className="font-semibold text-gray-800 text-sm">{category.name}</h4>
                    <div className="pl-3 mt-1 space-y-1">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          to={`/category/${slugify(sub.name)}`}
                          className="block text-sm text-gray-600 hover:text-red-700 py-1"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={`/category/${slugify(category.name)}`} className="block font-semibold text-gray-800 text-sm hover:text-red-700">
                    {category.name}
                  </Link>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const Header = () => {
  const [isLiquorOpen, setIsLiquorOpen] = useState(false);
  const liquorRef = useRef(null);
  const { cartCount, showCart, setShowCart } = UseCart();

  // state for the mobile left sidebar drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // close dropdown when clicking outside
  useEffect(() => {
    if (!isLiquorOpen) return undefined;

    const handleOutside = (e) => {
      if (liquorRef.current && !liquorRef.current.contains(e.target)) {
        setIsLiquorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [isLiquorOpen]);

  // Liquor store categories as requested by the user
  const liquorStoreCategories = [
    { name: 'Whisky', href: '/category/whisky' },
    { name: 'Gin', href: '/category/gin' },
    { name: 'Vodka', href: '/category/vodka' },
    { name: 'Wine', href: '/category/wine' },
    { name: 'Rum', href: '/category/rum' },
    { name: 'Cognac & Brandy', href: '/category/cognac-brandy' },
    { name: 'Beer & Cider', href: '/category/beer-cider' },
    { name: 'Liqueurs & Aperitifs', href: '/category/liqueurs-aperitifs' },
    { name: 'Ready-to-Drink (RTD) & Local Spirits', href: '/category/rtd-local-spirits' },
    { name: 'Non-Alcoholic & Mixers', href: '/category/non-alcoholic-mixers' },
    { name: 'Smokes', href: '/category/smokes' }
  ];
  
  const otherLinks = [
    { name: "Events", to: "/events" },
    { name: "Merchandise", to: "/merchandise" },
    { name: "Hubble-bubble", href: "#hubble-bubble" },
  ];

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50 shadow-sm">
      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden inline-flex items-center justify-center p-2 border rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src={kickoffLogo} 
                alt="The Early Kick-Off" 
                className="h-16 w-auto hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center items-center">
            <ul className="flex items-center space-x-6">
              <li ref={liquorRef} className="relative">
                <button
                  aria-expanded={isLiquorOpen}
                  aria-controls="liquor-dropdown"
                  className="text-gray-900 hover:text-red-700 px-3 py-2 text-sm font-semibold flex items-center gap-1 transition-colors"
                    onClick={() => setIsLiquorOpen((s) => !s)}
                >
                  Liquor Store
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {/* Desktop dropdown - rendered when isLiquorOpen is true. Positioned inside li so hover doesn't break when moving pointer to dropdown. */}
                <div
                  id="liquor-dropdown"
                  className={`absolute left-0 top-full mt-2 p-4 bg-white border shadow-lg rounded-md z-50 transition-opacity duration-200 ${isLiquorOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                  style={{ maxHeight: '60vh', overflow: 'auto', minWidth: '220px' }}
                >
                  <div className="grid" style={{ gridTemplateColumns: '1fr' }}>
                    {liquorStoreCategories.map((category) => (
                      <div key={category.name} className="py-1">
                        <Link
                          to={category.href || `/category/${slugify(category.name)}`}
                          className="block p-1 text-sm text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded transition-colors font-medium"
                        >
                          {category.name}
                        </Link>
                            {category.subcategories && (
                              <div className="pl-3 mt-1 space-y-1">
                                {category.subcategories.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    to={sub.href || `/category/${slugify(sub.name)}`}
                                    className="block text-sm text-gray-600 hover:text-red-700 py-0.5"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            {otherLinks.map(link => (
                 <li key={link.name}>
                    {link.to ? (
                      <Link to={link.to} className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                        {link.name}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                        {link.name}
                      </a>
                    )}
                 </li>
              ))}
            </ul>
          </nav>

          {/* Header actions */}
          <div className="flex items-center space-x-2">
                        <UserMenu />
            <Link to="/wishlist" className="inline-flex items-center justify-center p-2 border rounded-md text-gray-700 hover:bg-gray-100" aria-label="View wishlist">
              <Heart className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setShowCart(true)}
              className="relative inline-flex items-center justify-center p-2 border rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && !showCart && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Drawer (left sliding) */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity ${isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!isDrawerOpen}>
        {/* overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity ${isDrawerOpen ? 'opacity-40' : 'opacity-0'}`} onClick={() => setIsDrawerOpen(false)} />

        {/* drawer panel */}
        <aside className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl transform transition-transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <Link to="/" onClick={() => setIsDrawerOpen(false)} className="flex items-center">
                <img src={kickoffLogo} alt="logo" className="h-12 w-auto" />
              </Link>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-600 p-2 rounded hover:bg-gray-100" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* divider */}
            <div className="border-t border-gray-200 mb-4" />

            <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-3">
                {/* other header links */}
                {otherLinks.map((link) => (
                  <li key={link.name}>
                    {link.to ? (
                      <Link to={link.to} onClick={() => setIsDrawerOpen(false)} className="block font-semibold text-black-900">{link.name}</Link>
                    ) : (
                      <a href={link.href} onClick={() => setIsDrawerOpen(false)} className="block font-semibold text-black-900">{link.name}</a>
                    )}
                  </li>
                ))}

                {/* Liquor store section */}
                <li>
                  <h4 className="mt-4 mb-2 text-black-900 font-bold">Liquor Store</h4>
                  <div className="space-y-1">
                    {liquorStoreCategories.map((cat) => (
                      <div key={cat.name}>
                        <Link to={cat.href || `/category/${slugify(cat.name)}`} onClick={() => setIsDrawerOpen(false)} className="block font-medium text-gray-700">{cat.name}</Link>
                        {cat.subcategories && (
                          <div className="pl-3 mt-1 text-sm text-gray-700">
                            {cat.subcategories.map((s) => (
                              <Link key={s.name} to={s.href || `/category/${slugify(s.name)}`} onClick={() => setIsDrawerOpen(false)} className="block py-0.5">{s.name}</Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </li>

                {/* user actions at bottom */}
              </ul>
            </nav>

            {/* bottom actions removed as requested */}
          </div>
        </aside>
      </div>

      {/* Mobile menu button now toggles the drawer on small screens */}
      <style>{""}
      </style>
    </header>
  );
};

export default Header;