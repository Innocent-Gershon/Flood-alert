import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react'; // Icons for the mobile menu
import logo from '../Images/logo121.png';
import hero1 from '../Images/hero1.jpg';
import hero2 from '../Images/hero3.jpg';
import hero3 from '../Images/hero2.jpg';

export default function Landing() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#f4f4ff] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
        <img src={logo} alt="Logo" className="h-10 cursor-pointer" onClick={() => navigate('/')} />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center text-lg font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <button
            onClick={() => navigate('/login')}
            className="hover:text-blue-600 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-800 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition-transform duration-300 hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
            <MenuIcon className="h-8 w-8 text-gray-800" />
          </button>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-[60] flex flex-col items-center p-6">
          <div className="w-full flex justify-end">
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <XIcon className="h-8 w-8 text-gray-800" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-8 mt-16 text-2xl font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">
              Contact
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/login');
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/register');
              }}
              className="bg-gray-800 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-transform duration-300 hover:scale-105 mt-4"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 lg:px-24 py-12 flex-1">
        {/* Left Text Section */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Stay Ahead of<br />
            <span className="text-blue-600">Dangerous</span> <br />
            <span className="text-blue-600">Flood</span> Situations
          </h1>
          <p className="text-gray-700 text-lg max-w-md mx-auto lg:mx-0">
            Get Real-Time Alerts, Trusted Emergency Responders, and a Community That Cares About Your Safety!
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-yellow-300 text-black px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-yellow-400 transition-transform duration-300 hover:scale-105"
          >
            Get Started Now
          </button>
        </div>

        {/* Right Images Section */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-4 items-center justify-center">
          <img src={hero1} alt="Community helping" className="rounded-3xl shadow-lg w-full h-full object-cover" />
          <img src={hero2} alt="Emergency response" className="rounded-3xl shadow-lg w-full h-full object-cover" />
          <img src={hero3} alt="Safe community" className="rounded-3xl col-span-2 w-full shadow-lg" />
        </div>
      </main>
    </div>
  );
}