import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//Might want to destructure all of these for less lines when you're done
import Cookies from 'js-cookie';
import Advertisement from './components/Advertisement';
import Cart from './components/Cart';
import Collection from './components/Collection';
import Comments from './components/Comments';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FooterAd from './components/FooterAd';
import Home from './components/Home';
import HomeDisplay from './components/HomeDisplay';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import ProductCategory from './components/ProductCategory';
import ProductSale from './components/ProductSale';
import Products from './components/Products';
import Register from './components/Register';
import Shop from './components/Shop';
import SingleProduct from './components/SingleProduct';
import './index.css';

function App() {
  const url = process.env.REACT_APP_API_URL; // Access localhost or vercel
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Default so it doesn't display a user
  const [username, setUsername] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); //navigate directories

  //useEffect allows me to perform side functions in my component
  useEffect(() => {
    const username = localStorage.getItem('username'); //Defining this in a component that is always rendered so it doesn't disappear on refresh
    const token = Cookies.get('token'); //Checking to see if a token still exists in cookies then logging in a user based on that
    if (token) {
      setIsLoggedIn(true);
      setUsername(username);
      fetchCartData();
    }
  }, []); //Only fetches these once


  const handleLogout = () => {
    try {
      setIsLoggedIn(false);
      setUsername('');
      Cookies.remove('token');
      localStorage.removeItem('username');
      navigate('/'); //After logout redirect to the home page
      setCartItems([]); //Setting carts to 0 on logout
    } catch (error) {
      console.error('Error during logout: ', error.message);
    }
  };

  //Fetching the items that are existing in the cart
  const fetchCartData = async () => {
    const token = Cookies.get('token');
    if (cartItems.length === 0) {
      try {
        const response = await fetch(`${url}/auth/user/cart`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error(`Network response error: ${response.statusText}`);
        }
        const data = await response.json();
        // console.log('Cart Data from API:', data);
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setError('Could not fetch cart data');
      }
    }
  };

  //Refetch cart data
  const refetchCartData = () => {
    fetchCartData();
  };


  return (
    //Allowing router to work across app.js

    <div className="App font-abc subpixel-antialiased text-gray-900 bg-white">
      <header className="App-header">
        {/* passing onLogout prop to Navbar to utilize the logout func */}
        <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} cartAmount={cartItems.length} />
      </header>
      <div className='content'>
        {/* Switch makes sure only one route is shown at a given time */}
        {/* Switch was replaced with routes in version 6 of react */}
        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <Advertisement />
              <HomeDisplay />
              <FooterAd />
            </>
          }
          />
          <Route path="/shop" element={
            <>
              <Shop />
              <Products url={url} />
              <Advertisement />
              <FooterAd />
            </>
          }
          />
          <Route path="/collection" element={
            <>
              <Collection />
            </>
          }
          />
          <Route path="/contact" element={
            <>
              <Contact />
            </>
          }
          />
          <Route path="/api/product/category/:category" element={
            <>
              <Shop />
              <ProductCategory url={url} />
              <FooterAd />
            </>
          }
          />
          <Route path="/api/product/category/sale" element={
            <>
              <Shop />
              <ProductSale url={url} />
              <FooterAd />
            </>
          }
          />
          <Route path="/api/product/:productId" element={
            <>
              <SingleProduct isLoggedIn={isLoggedIn} username={username} setCartItems={setCartItems} url={url} />
              <Comments isLoggedIn={isLoggedIn} username={username} url={url} />
            </>
          }
          />
          <Route path="/auth/login" element={
            <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} refetchCartData={refetchCartData} url={url} />
          } />
          <Route path="/auth/register" element={
            <Register setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} url={url} />
          } />
          {/* You can change the other routes so they arent so revealing */}
          <Route path="/cart" element={
            <Cart isLoggedIn={isLoggedIn} username={username} cartItems={cartItems}
              setCartItems={setCartItems} setError={setError} error={error} refetchCartData={refetchCartData} url={url} />
          } />
          <Route path="*" element={
            <NotFound />
          } />
        </Routes>
        <Footer />
      </div>
    </div>

  );
}

export default App;
