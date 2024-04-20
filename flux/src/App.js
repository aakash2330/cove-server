import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
//Might want to destructure all of these for less lines when you're done
import Cookies from 'js-cookie';
import Advertisement from './components/Advertisement';
import Cart from './components/Cart';
import CheckoutSuccess from './components/CheckoutSuccess';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Default so it doesn't display a user
  const [username, setUsername] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [autoLogout, setAutoLogout] = useState(false);
  const navigate = useNavigate(); //navigate directories
  // const timeout = 10 * 1000; //currently testing for 10 seconds
  // let logoutTimer; // Variable to be used in logout timer functions

  //useEffect allows me to perform side functions in my component
  useEffect(() => {
    //Defining this in a component that is always rendered so it doesn't disappear on refresh
    const username = localStorage.getItem('username');
    //Checking to see if a token still exists in cookies then logging in a user based on that
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
      setUsername(username);
      fetchCartData();
      // startLogoutTimer(); // starts timer once we log in
    }
  }, []); //Only fetches these once

  useEffect(() => {
    if(autoLogout) {
      handleLogout();
    }
  }, [autoLogout]);

  const handleLogout = () => {
    try {
      // clearTimeout(logoutTimer); //clearing timer so it doesnt trigger the logout function when signed out'
      setAutoLogout(false);
      setIsLoggedIn(false);
      setUsername('');
      Cookies.remove('token');
      localStorage.removeItem('username');
      //After logout redirect to the home page
      navigate('/');
      //Setting carts to 0 on logout
      setCartItems([]);

    } catch (error) {
      console.error('Error during logout: ', error.message);
    }
  };


  // const startLogoutTimer = () => {
  //   console.log('timer starting');
  //   // setTimeout(callbackFunction, delay); so we run logout after delay 
  //   logoutTimer = setTimeout(() => {
  //     console.log('Logging out');
  //     handleLogout();
  //   }, timeout); // delay of 1 hour
  // }

  //Fetching the items that are existing in the cart
  const fetchCartData = async () => {
    const token = Cookies.get('token');
    if (cartItems.length === 0) {
      try {
        const response = await fetch(`http://localhost:3001/auth/user/cart`, {
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
        console.log('Cart Data from API:', data);
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
              <Products />
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
              <ProductCategory />
              <FooterAd />
            </>
          }
          />
          <Route path="/api/product/category/sale" element={
            <>
              <Shop />
              <ProductSale />
              <FooterAd />
            </>
          }
          />
          <Route path="/api/product/:productId" element={
            <>
              <SingleProduct isLoggedIn={isLoggedIn} username={username} setCartItems={setCartItems} />
              <Comments isLoggedIn={isLoggedIn} username={username} />
            </>
          }
          />
          <Route path="/auth/login" element={
            <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} refetchCartData={refetchCartData} setAutoLogout={setAutoLogout} />
          } />
          <Route path="/auth/register" element={
            <Register setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setAutoLogout={setAutoLogout} />
          } />
          {/* You can change the other routes so they arent so revealing */}
          <Route path="/cart" element={
            <Cart isLoggedIn={isLoggedIn} username={username} cartItems={cartItems}
              setCartItems={setCartItems} setError={setError} error={error} refetchCartData={refetchCartData} />
          } />
          <Route path="/checkout-success" element={
            <CheckoutSuccess />
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
