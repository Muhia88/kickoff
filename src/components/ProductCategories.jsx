const ProductCategories = () => {
  const categories = [
    {
      name: 'WHISKY',
      image: '/whiskey/matrell.png',
      href: '/whisky'
    },
    {
      name: 'RUM',
      image: '/rum/bacardi_black_carta_negra.png',
      href: '/rum'
    },
    {
      name: 'BEER',
      image: '/beer/guiness.png',
      href: '/beer'
    },
    {
      name: 'TEQUILA',
      image: '/tequila/don_julio_anejo.png',
      href: '/tequila'
    },
    {
      name: 'COGNAC',
      image: '/cognac/hennessy_xo.png',
      href: '/cognac'
    },
    {
      name: 'WINE',
      image: '/wine/harveys_bristol_cream.png',
      href: '/wine'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 px-4 py-2">
                    <h3 className="text-black text-sm font-bold text-center">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;