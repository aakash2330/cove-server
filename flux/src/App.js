import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Advertisment from './components/Advertisment';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
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
              </>
            } />
          </Routes>
          <Advertisment />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
