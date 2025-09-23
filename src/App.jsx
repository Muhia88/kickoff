import Header from './components/Header';
import Hero from './components/Hero';
import ProductCategories from './components/ProductCategories';
import FeaturedItems from './components/FeaturedItems';
import ProductOfTheWeek from './components/ProductOfTheWeek';
import PromoBanners from './components/PromoBanners';
import WhatsAppContact from './components/WhatsAppContact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProductCategories />
      <FeaturedItems />
      <ProductOfTheWeek />
      <PromoBanners />
      <Footer />
      <WhatsAppContact />
    </div>
  );
}

export default App;