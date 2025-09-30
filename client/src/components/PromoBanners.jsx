const PromoBanners = () => {
  const banners = [
    {
      title: 'CLEARANCE',
      subtitle: 'UP TO 50% OFF',
      image: 'https://ext.same-assets.com/4095877370/1645971327.jpeg',
      bgColor: 'from-amber-400 to-orange-500',
      href: '/clearance'
    },
    {
      title: 'TOP BRANDS',
      subtitle: 'SHOP NOW!',
      image: 'https://ext.same-assets.com/4095877370/2986042093.jpeg',
      bgColor: 'from-gray-800 to-gray-900',
      href: '/barrel-picks'
    },
    {
      title: 'TOP TRENDING',
      subtitle: 'BOTTLES',
      image: 'https://ext.same-assets.com/4095877370/3048299231.jpeg',
      bgColor: 'from-liquor-brown to-amber-800',
      href: '/top-selling'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <a
              key={index}
              href={banner.href}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-[4/3] relative">
                {/* Background Image */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-80 group-hover:opacity-70 transition-opacity duration-300`} />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-2 tracking-wider">
                    {banner.title}
                  </h3>
                  <p className="text-sm md:text-base font-medium uppercase tracking-wider">
                    {banner.subtitle}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;