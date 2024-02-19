import Navbar from './Navbar';
import Home from './Home';
import './index.css';
import Women from './Women';
import Advertisment from './Advertisment';
import Footer from './Footer';

function App() {
  return (
    <div className="App font-abc text-gray-900 bg-white">
      <header className="App-header">
        <Navbar />
      </header>
      <Home />
      <Women />
      <Advertisment />
      <Footer />
    </div>
  );
}

export default App;
