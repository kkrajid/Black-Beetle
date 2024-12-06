import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';
import BeetleLogo from "@/assets/images/screener-logo.png";

export function NavbarSecond() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef(null);
    const navigate = useNavigate();

    const navItems = [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/trades' },
    ];
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
  
      window.addEventListener('scroll', handleScroll);
      
      // Check for authToken
      const authToken = localStorage.getItem('authToken');
      setIsLoggedIn(!!authToken);

      // Fetch notifications (simulated)
      setNotifications([
        { id: 1, message: "New product available", time: "2 hours ago" },
        { id: 2, message: "Your order has been shipped", time: "1 day ago" },
        { id: 3, message: "Price drop on your wishlist item", time: "3 days ago" },
      ]);

      const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setShowNotifications(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      navigate('/');
    };

    const toggleNotifications = () => {
      setShowNotifications(!showNotifications);
    };
  
    return (
      <nav 
        className={`fixed w-full z-50 transition-all bg-[#2D2E2D] duration-300 ease-in-out ${
          isScrolled 
            ? ' bg-opacity-90 backdrop-blur-sm shadow-md' 
            : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="block">
                <img
                  src={BeetleLogo}
                  alt="Black Beetle"
                  className="h-16 sm:h-20 w-auto"
                />
              </a>
            </div>
  
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors text-white hover:text-[#D4AF37]"
                >
                  {item.name}
                </a>
              ))}
            </div>
  
            {/* Auth Buttons and Notifications */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && (
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={toggleNotifications}
                    className="text-white hover:text-[#D4AF37] transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell size={24} />
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                      <div className="py-2">
                        <h3 className="text-sm font-medium text-gray-900 px-4 py-2">Notifications</h3>
                        {notifications.map((notification) => (
                          <div key={notification.id} className="px-4 py-3 hover:bg-gray-100">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-md text-sm font-medium transition-colors bg-[#D4AF37] text-black hover:bg-[#B4941F]"
                >
                  Logout
                </button>
              ) : (
                <>
                  <a 
                    href="/login" 
                    className="text-sm font-medium transition-colors text-white hover:text-[#D4AF37]"
                  >
                    Login
                  </a>
                  <a 
                    href="/signup" 
                    className="px-6 py-2 rounded-md text-sm font-medium transition-colors bg-[#D4AF37] text-black hover:bg-[#B4941F]"
                  >
                    Signup
                  </a>
                </>
              )}
            </div>
  
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {isLoggedIn && (
                <div className="relative mr-4" ref={notificationRef}>
                  <button
                    onClick={toggleNotifications}
                    className="text-white hover:text-[#D4AF37] transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell size={24} />
                  </button>
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                      <div className="py-2">
                        <h3 className="text-sm font-medium text-gray-900 px-4 py-2">Notifications</h3>
                        {notifications.map((notification) => (
                          <div key={notification.id} className="px-4 py-3 hover:bg-gray-100">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-[#D4AF37] transition-colors"
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
  
        {/* Mobile menu */}
        <div
          className={`md:hidden bg-[#2D2E2D] transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="bg-[#D4AF37] text-black hover:bg-[#B4941F] block w-full px-3 py-2 rounded-md text-base font-medium text-center transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <a
                    href="/login"
                    className="text-white hover:bg-black block w-full px-3 py-2 rounded-md text-base font-medium text-center transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="bg-[#D4AF37] text-black hover:bg-[#B4941F] block w-full px-3 py-2 rounded-md text-base font-medium text-center transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Signup
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }

