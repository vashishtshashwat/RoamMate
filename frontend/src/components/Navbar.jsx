import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Moon, Sun, ChevronDown, Menu, X, User } from 'lucide-react';

import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-40 transition-all duration-300 bg-white/95 dark:bg-black/95 backdrop-blur-sm shadow-lg text-black dark:text-white`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <Compass className="w-8 h-8 text-yellow-400 group-hover:rotate-[360deg] transition-transform duration-500" />
          <span className="text-2xl font-bold">
            Roam<span className="text-yellow-400">Mate</span>
          </span>
        </Link>
        <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center w-full md:w-auto`}>
          <div className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-1">
            <Link 
              to="/destinations" 
              className={`font-bold hover:text-yellow-400 transition-all ${
                isScrolled ? 'text-black dark:text-white' : 'text-black'
              }`}
            >
              Destinations
            </Link>
            <Link 
              to="/how-it-works" 
              className={`font-bold hover:text-yellow-400 transition-all ${
                isScrolled ? 'text-black dark:text-white' : 'text-black'
              }`}
            >
              How It Works
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/ownuserprofile" className="flex items-center space-x-2 hover:text-yellow-400">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-black font-medium">{user.name ?user.name.charAt(0).toUpperCase():""}</span>
                    )}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`fixed top-0 right-0 w-full h-full bg-white z-[1000] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute right-4 top-4 cursor-pointer" onClick={() => setIsOpen(false)}>
          <X className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-center justify-center h-full py-20 space-y-8">
          <div className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-1">
            <Link 
              to="/destinations" 
              className={`font-bold hover:text-yellow-400 transition-all ${
                isScrolled ? 'text-black dark:text-white' : 'text-black'
              }`}
            >
              Destinations
            </Link>
            <Link 
              to="/how-it-works" 
              className={`font-bold hover:text-yellow-400 transition-all ${
                isScrolled ? 'text-black dark:text-white' : 'text-black'
              }`}
            >
              How It Works
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/ownuserprofile" className="flex items-center space-x-2 hover:text-yellow-400">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-black font-medium">{user.name ? user.name.charAt(0).toUpperCase() : "?"}</span>
                    )}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;