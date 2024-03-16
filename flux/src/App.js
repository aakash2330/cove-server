import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
//Might want to destructure all of these for less lines when you're done
import Advertisment from './components/Advertisment';
import Comments from './components/Comments';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProductCategory from './components/ProductCategory';
import Products from './components/Products';
import Register from './components/Register';
import SingleProduct from './components/SingleProduct';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Default so it doesn't display a user
  const [username, setUsername] = useState('');

  //useEffect allows me to perform side functions in my component
  useEffect(() => {
    //Defining this in a component that is always rendered so it doesn't disappear on refresh
    //Checking to see if a token still exists in local storage then logging in a user based on that
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setUsername(username);
    }
  }, []); //Empty array dependency ensures that this only runs once //Second argument

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');

  };

  return (
    //Allowing router to work across app.js
    <Router>
      <div className="App font-abc text-gray-900 bg-white">
        <header className="App-header">
          {/* passing onLogout prop to Navbar to utilize the logout func */}
          <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
        </header>
        <div className='content'>
          {/* Switch makes sure only one route is shown at a given time */}
          {/* Switch was replaced with routes in version 6 of react */}
          <Routes>
            <Route path="/home" element={
              <>
                <Home />
                <Products />
                <Advertisment />
              </>
            }
            />
            <Route path="/api/product/category/:category" element={
              <>
                <Home />
                <ProductCategory />
                <Advertisment />
              </>
            }
            />
            <Route path="/api/product/:productId" element={
              <>
                <SingleProduct />
                <Comments isLoggedIn={isLoggedIn} username={username} />
              </>
            }
            />
            <Route path="/auth/login" element={
              <Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            } />
            <Route path="/auth/register" element={
              <Register setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
            } />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
