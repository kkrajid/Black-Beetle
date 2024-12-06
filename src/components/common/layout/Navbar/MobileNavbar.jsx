import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import BeetleLogo from "@/assets/images/screener-logo.png";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/trades' },
    { name: 'Products', href: '/trades' },
  ];

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      setIsAuthenticated(!!authToken);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    checkAuth();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleProfileClick = () => {
    navigate('/trades');
    setIsOpen(false);
  };

  return (
    <nav className={`
      md:hidden 
      fixed 
      top-0 
      left-0 
      right-0 
      z-50 
      ${isScrolled ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'}
      transition-all 
      duration-300 
      ease-in-out
    `}>
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="block">
          <img
            src={BeetleLogo}
            alt="Black Beetle"
            className="w-auto h-10"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-yellow-500 transition-colors p-2"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/80 backdrop-blur-md shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-white hover:text-yellow-500 text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <button
                onClick={handleProfileClick}
                className="block w-full text-left text-white hover:text-yellow-500 text-lg font-medium"
              >
                Profile
              </button>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/login"
                  className="block w-full text-center text-white hover:text-yellow-500 text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-yellow-500 text-black hover:bg-yellow-400 py-3 rounded-lg text-lg font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default MobileNavbar;