import { useState } from "react";
import { Menu, ShoppingCart, User, Heart } from "lucide-react";
import kickoffLogo from "../../../images/logo/kickoff_logo.jpeg";

// 1. NEW COMPONENT: A self-contained dropdown for the mobile menu.
// It manages its own open/closed state.
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
                      <a key={sub.name} href={sub.href} className="block text-sm text-gray-600 hover:text-red-700 py-1">
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a href={category.href} className="block font-semibold text-gray-800 text-sm hover:text-red-700">
                  {category.name}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const liquorStoreCategories = [
    {
      name: "Spirits",
      subcategories: [
        { name: "Rare & Top Shelf", href: "#rare-top-shelf" },
        { name: "Brandy", href: "#brandy" },
        { name: "Cognac", href: "#cognac" },
        { name: "Gin", href: "#gin" },
        { name: "Liqueurs", href: "#liqueurs" },
        { name: "Rum", href: "#rum" },
        { name: "Vodka", href: "#vodka" },
        { name: "Whisky", href: "#whisky" },
        { name: "All Spirits", href: "#all-spirits" }
      ]
    },
    {
      name: "Tequila",
      subcategories: [
        { name: "Blanco", href: "#blanco" },
        { name: "Reposado", href: "#reposado" },
        { name: "Anejo", href: "#anejo" },
        { name: "Extra Anejo", href: "#extra-anejo" },
        { name: "Cristalino", href: "#cristalino" }
      ]
    },
    {
      name: "Wine",
      subcategories: [
        { name: "Red Wine", href: "#red-wine" },
        { name: "White Wine", href: "#white-wine" },
        { name: "Sparkling Wine & Champagne", href: "#sparkling" },
        { name: "Rose Wine", href: "#rose" },
        { name: "Sake & Plum Wine", href: "#sake" },
        { name: "Dessert Wine", href: "#dessert" }
      ]
    },
    { name: "Craft Beer", href: "#craft-beer" },
    { name: "Bundles & Gift Sets", href: "#bundles" },
    { name: "Sodas & Snacks", href: "#snacks" },
    { name: "Clearance", href: "#clearance" }
  ];
  
  const otherLinks = [
      { name: "Events", href: "#events" },
      { name: "Merchandise", href: "#merchandise" },
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src={kickoffLogo} 
                alt="The Early Kick-Off" 
                className="h-16 w-auto hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center items-center">
            <ul className="flex items-center space-x-6">
              <li className="relative group">
                <button className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors">
                  Liquor Store
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-6 w-[800px] bg-white border shadow-lg rounded-md hidden group-hover:grid grid-cols-3 gap-6">
                  {liquorStoreCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <h4 className="font-semibold text-sm text-red-700">{category.name}</h4>
                      {category.subcategories ? (
                        category.subcategories.map((sub) => (
                          <a key={sub.name} href={sub.href} className="block p-1 text-sm text-gray-600 hover:text-red-700 hover:bg-gray-50 rounded transition-colors">
                            {sub.name}
                          </a>
                        ))
                      ) : (
                        <a href={category.href} className="block p-1 text-sm text-gray-600 hover:text-red-700 hover:bg-gray-50 rounded transition-colors">
                          View All
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </li>
              {otherLinks.map(link => (
                 <li key={link.name}>
                    <a href={link.href} className="text-gray-800 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors">
                        {link.name}
                    </a>
                 </li>
              ))}
            </ul>
          </nav>

          {/* Header actions */}
          <div className="flex items-center space-x-2">
            <button className="hidden md:inline-flex items-center justify-center p-2 border rounded-md text-gray-700 hover:bg-gray-100">
              <User className="h-5 w-5" />
            </button>
            <button className="hidden md:inline-flex items-center justify-center p-2 border rounded-md text-gray-700 hover:bg-gray-100">
              <Heart className="h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center p-2 border rounded-md text-gray-700 hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* 2. MODIFIED Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t p-4">
          <div className="space-y-4">
            {/* Other links now appear first and are styled in red */}
            {otherLinks.map(link => (
              <a key={link.name} href={link.href} className="block font-bold text-red-700 hover:text-red-800 text-base py-1">{link.name}</a>
            ))}
            
            {/* The new collapsible component is used here */}
            <MobileLiquorStoreDropdown categories={liquorStoreCategories} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;