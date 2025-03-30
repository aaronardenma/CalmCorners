import React, { useState } from 'react';

interface NavItem {
  id: number;
  title: string;
  url: string;
}

const VerticalHamburgerNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Sample navigation items
  const navItems: NavItem[] = [
    { id: 1, title: 'Home', url: '/' },
    { id: 2, title: 'About', url: '/about' },
    { id: 3, title: 'Services', url: '/services' },
    { id: 4, title: 'Portfolio', url: '/portfolio' },
    { id: 5, title: 'Contact', url: '/contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 h-screen">
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-12 h-12 bg-gray-800 text-white p-2 focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white mt-1.5 transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Navigation Menu */}
      <div 
        className={`bg-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
        style={{ height: 'calc(100vh - 48px)' }}
      >
        <ul className="py-4">
          {navItems.map((item) => (
            <li key={item.id} className="px-4">
              <a 
                href={item.url}
                className="block py-2 text-white hover:bg-gray-700 rounded px-2 whitespace-nowrap"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default VerticalHamburgerNavbar;
