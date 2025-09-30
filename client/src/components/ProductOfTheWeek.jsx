const ProductOfTheWeek = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-gray-500 uppercase tracking-wider">
                PRODUCT OF THE WEEK
              </span>
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-800 mt-2">
                Jack Daniel's Barrel Proof Single Barrel Rye Whiskey by Early Kick-Off
              </h2>
            </div>

            <p className="text-gray-600 leading-relaxed">
              Uncut. Unfiltered. Unapologetically bold. This Early Kick-Off Liquor-selected barrel of Jack Daniel's Barrel Proof Single Barrel Rye is a rare, high-proof expression that showcases the full intensity of Tennessee rye craftsmanship.
            </p>

            <button className="bg-gray-900 text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-200">
              SHOP NOW
            </button>
          </div>

          {/* Product Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8">
              <img
                src="https://ext.same-assets.com/4095877370/3433335847.jpeg"
                alt="Jack Daniel's Barrel Proof Single Barrel Rye Whiskey"
                className="w-full h-auto max-w-sm mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOfTheWeek;