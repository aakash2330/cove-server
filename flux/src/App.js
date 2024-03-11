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
import SingleProduct from './components/SingleProduct';
import './index.css';

function App() {
  return (
    //Allowing router to work across app.js
    <Router>
      <div className="App font-abc text-gray-900 bg-white">
        <header className="App-header">
          <Navbar />
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
            <Comments />
              </>
          } 
            />
            <Route path ="/auth/login" element = { <Login /> } />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
