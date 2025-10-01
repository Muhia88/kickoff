import heroBackgroundImage from '../assets/background_alcohol.jpg';

const Hero = () => {
  const categories = [
    { name: 'POPULAR', href: '#featured-items' },
    { name: 'BRANDS', href: '/brands' },
  ];

  return (
    <section className="relative h-96 flex items-center justify-center text-center text-white overflow-hidden">
      {/* Container for Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackgroundImage}
          alt="A collection of various liquor bottles on display shelves"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <p className="text-sm uppercase tracking-wider mb-2 font-light">
          YOUR ONLINE LIQUOR STORE WITH
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-8 leading-tight text-shadow">
          Plenty of Exclusive<br />
          Quality Drinks
        </h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="bg-black text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 border border-white rounded-full"
              style={{ scrollBehavior: 'smooth' }}
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;