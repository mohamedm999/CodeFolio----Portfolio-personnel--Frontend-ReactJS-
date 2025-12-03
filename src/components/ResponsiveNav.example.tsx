import React, { useState } from 'react';
import { useBreakpoint } from '../hooks';

/**
 * Example: Responsive Navigation Component
 * 
 * This demonstrates how to create a responsive nav that:
 * - Shows full menu on desktop
 * - Shows hamburger menu on mobile
 * - Uses custom hooks for breakpoint detection
 * 
 * To use: Replace your existing nav in Home.tsx
 */

export const ResponsiveNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useBreakpoint();

  const navItems = ['Home', 'About', 'Projects', 'Skills', 'Contact'];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" 
      style={{ 
        background: 'rgba(10, 9, 26, 0.8)', 
        borderBottom: '1px solid rgba(90, 107, 140, 0.2)' 
      }}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 mx-auto">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold" style={{ color: '#3A7FFF' }}>
          Portfolio
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-medium transition-all duration-300 hover:text-white group"
                style={{ color: '#5A6B8C' }}
              >
                {item}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" 
                  style={{ background: 'linear-gradient(90deg, #3A7FFF, #A335E0)' }}
                />
              </a>
            ))}
          </div>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl transition-transform duration-300"
            style={{ color: '#3A7FFF' }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && isMenuOpen && (
        <div 
          className="absolute top-full left-0 w-full py-4 backdrop-blur-xl"
          style={{ background: 'rgba(10, 9, 26, 0.95)' }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-6 py-3 text-base font-medium transition-colors duration-200"
              style={{ color: '#5A6B8C' }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => e.currentTarget.style.color = '#3A7FFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#5A6B8C'}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
