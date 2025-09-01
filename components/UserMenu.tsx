import React from 'react';
import { Icon } from './Icon';
import { ICONS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuProps {
  onNavClick: (page: string) => void;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onNavClick, onClose }) => {
  const { logout } = useAuth();

  const handleMenuClick = (page: string) => {
    onNavClick(page);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const menuItems = [
    { label: 'Profile', icon: ICONS.profile, action: () => handleMenuClick('Profile') },
    { label: 'Friends', icon: ICONS.users, action: () => handleMenuClick('Friends') },
    { label: 'Settings', icon: ICONS.settings, action: () => handleMenuClick('Settings') },
    { label: 'Billing', icon: ICONS.billing, action: () => handleMenuClick('Billing') },
  ];

  return (
    <div
      className="absolute top-full right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg origin-top-right animate-fade-in-down"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      <div className="py-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            role="menuitem"
          >
            <Icon svg={item.icon} className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
        <div className="border-t border-gray-700 my-1" />
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          role="menuitem"
        >
          <Icon svg={ICONS.logout} className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;