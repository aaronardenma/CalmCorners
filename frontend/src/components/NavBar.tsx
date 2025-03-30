import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  id: number;
  title: string;
  url: string;
}

const NavBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Sample navigation items
  const navItems: NavItem[] = [
    { id: 1, title: 'Home', url: '/' },
    { id: 2, title: 'Submit Review', url: '/review' },
    { id: 3, title: 'Contact', url: '/contact' }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 h-screen z-50">
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-12 h-12 bg-gray-800 text-white p-2 focus:outline-none relative z-50"
        aria-label="Toggle navigation menu"
      >
        <div className="w-6 h-6 relative flex justify-center items-center">
          {/* Top bar */}
          <span 
            className={`absolute h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'w-6 rotate-45' : 'w-6 -translate-y-2'
            }`}
          ></span>
          
          {/* Middle bar */}
          <span 
            className={`absolute h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'w-0 opacity-0' : 'w-6'
            }`}
          ></span>
          
          {/* Bottom bar */}
          <span 
            className={`absolute h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'w-6 -rotate-45' : 'w-6 translate-y-2'
            }`}
          ></span>
        </div>
      </button>

      {/* Navigation Menu */}
      <div 
        className={`bg-gray-800 overflow-hidden transition-all duration-300 ease-in-out z-40 shadow-lg ${
          isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
        style={{ height: 'calc(100vh - 48px)' }}
      >
        <ul className="py-4">
          {navItems.map((item) => (
            <li key={item.id} className="px-4">
              <Link 
                to={item.url}
                className="block py-2 text-white hover:bg-gray-700 rounded px-2 whitespace-nowrap"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;