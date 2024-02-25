import Home from './Home';
import Advertisment from './components/Advertisment';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Women from './components/Women';
import './index.css';

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
