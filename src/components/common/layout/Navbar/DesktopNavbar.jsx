
import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import BeetleLogo from "@/assets/images/screener-logo.png";



export function DesktopNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
  
    const navItems = [
      { name: 'Home', href: '/trades' },
      { name: 'Products', href: '/trades' },
    ];
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
  
      const checkAuth = () => {
        const authToken = localStorage.getItem('authToken');
        setIsAuthenticated(!!authToken);
      };
  
      window.addEventListener('scroll', handleScroll);
      checkAuth();
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleProfileClick = () => {
      navigate('/trades');
    };
  
    return (
      <nav 
        className={`fixed w-full text-white transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-transparent bg-opacity-90 backdrop-blur-sm shadow-md z-50 top-0' 
            : ''
        } px-2 sm:px-4 hidden md:block`}
      >
        <div className={`max-w-7xl mx-auto text-white px-2 sm:px-6 lg:px-8 ${
          isScrolled 
            ? 'bg-transparent bg-opacity-90 backdrop-blur-sm shadow-md z-50 top-0' 
            : 'bg-[#2D2E2D] rounded-lg sm:rounded-2xl'
        }`}>
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="block">
                <img
                  src={BeetleLogo}
                  alt="Black Beetle"
                  className="w-auto h-8 sm:h-12 md:h-20"
                />
              </Link>
            </div>
  
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isScrolled 
                      ? 'text-white hover:text-yellow-500' 
                      : 'hover:text-black'
                  } text-sm font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
  
            {/* Auth Buttons or Profile Icon */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={handleProfileClick}
                  className={`${
                    isScrolled 
                      ? 'text-white hover:text-yellow-500' 
                      : 'text-white hover:text-black'
                  } text-sm font-medium transition-colors`}
                >
                  <User size={24} />
                </button>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className={`${
                      isScrolled 
                        ? 'text-white hover:text-yellow-500' 
                        : 'text-white hover:text-black'
                    } text-sm font-medium transition-colors`}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className={`${
                      isScrolled 
                        ? 'bg-black text-white hover:bg-gray-900' 
                        : 'bg-[#C4A137] text-black hover:bg-white border border-[#C4A137]'
                    } px-6 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
  