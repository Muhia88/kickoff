const PromoBanners = () => {
  const banners = [
    {
      title: 'EVENTS',
      subtitle: 'BOOK NOW!',
      image: '/events3.jpeg',
      bgColor: 'gray-100',
      href: '/events'
    },
    {
      title: 'MERCHANDISE',
      subtitle: 'SHOP NOW!',
      image: '/merchandise.jpg',
      bgColor: 'from-gray-800 to-gray-900',
      href: '/merchandise'
    },
    {
      title: '',
      subtitle: '',
      image: '/VIP2.jpg',
      bgColor: 'gray-900',
      href: '/vip'
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