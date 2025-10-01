import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCategories from './components/ProductCategories';
import FeaturedItems from './components/FeaturedItems';
import ProductOfTheWeek from './components/ProductOfTheWeek';
import PromoBanners from './components/PromoBanners';
import WhatsAppContact from './components/WhatsAppContact';
import Footer from './components/Footer';
import CategoryPage from './pages/liquorstore/CategoryPage';
import EventsPage from './pages/events/EventsPage';
import EventDetails from './pages/events/EventDetails';
import MerchandisePage from './pages/merchandise/MerchandisePage';
import SignIn from './pages/auth/SignIn';
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import Checkout from './pages/liquorstore/Checkout';
import Cart from './pages/liquorstore/Cart';
import WishList from './pages/liquorstore/WishList';
import ProductPage from './pages/liquorstore/ProductPage';
import Vip from './pages/liquorstore/Vip';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
  <Cart />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ProductCategories />
                <FeaturedItems />
                <ProductOfTheWeek />
                <PromoBanners />
              </>
            }
          />

          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/merchandise" element={<MerchandisePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/vip" element={<Vip />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

        <Footer />
        <WhatsAppContact />
      </div>
    </BrowserRouter>
  );
}

export default App;