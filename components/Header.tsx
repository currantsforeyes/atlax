import React, { useState, useEffect, useRef } from 'react';
import { ICONS } from '../constants';
import { Icon } from './Icon';
import UserMenu from './UserMenu';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNavClick: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative z-20 flex-shrink-0 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50">
      <div className="flex items-center justify-between h-16 px-6 lg:px-8">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon svg={ICONS.search} className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search experiences..."
            className="w-full bg-gray-700/50 border border-transparent focus:border-indigo-500 focus:ring-indigo-500 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 transition"
          />
        </div>

        {user ? (
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors" aria-label="Notifications">
              <Icon svg={ICONS.notification} className="h-6 w-6 text-gray-400" />
            </button>
            <div className="flex items-center space-x-2 bg-gray-700/50 px-3 py-1.5 rounded-full">
              <Icon svg={ICONS.currency} className="h-6 w-6 text-yellow-400" />
              <span className="font-bold text-lg">{user.currency.toLocaleString()}</span>
            </div>
            <div className="relative" ref={menuRef}>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-700/80 transition-colors">
                <img src={user.avatar_url} alt="User Avatar" className="h-9 w-9 rounded-full" />
                <span className="font-medium hidden sm:block">{user.username}</span>
                <Icon svg={ICONS.chevronDown} className={`h-4 w-4 text-gray-400 hidden sm:block transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMenuOpen && <UserMenu onNavClick={onNavClick} onClose={closeMenu} />}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
             <button
                onClick={() => onNavClick('Auth')}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
              >
                Login
              </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;