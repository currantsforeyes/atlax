import React from 'react';
import { ICONS } from '../constants';
import { Icon } from './Icon';
import { sidebarFriendsData } from '../data';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className={`flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 ${
      active
        ? 'bg-indigo-500 text-white'
        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
  >
    <Icon svg={icon} className="h-6 w-6" />
    <span className="font-medium">{label}</span>
  </a>
);

interface SidebarProps {
    activePage: string;
    onNavClick: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavClick }) => {
  const navItems = [
    { icon: ICONS.home, label: 'Home' },
    { icon: ICONS.discover, label: 'Discover' },
    { icon: ICONS.create, label: 'Create' },
    { icon: ICONS.avatar, label: 'Avatar' },
    { icon: ICONS.store, label: 'Store' },
  ];

  return (
    <aside className="w-64 bg-gray-800 flex flex-col p-4 space-y-6 flex-shrink-0">
      <div className="flex items-center space-x-2 px-3">
        <Icon svg={ICONS.logo} className="h-8 w-8 text-indigo-400"/>
        <span className="text-2xl font-bold text-white">ATLAX</span>
      </div>
      
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={item.label === activePage}
            onClick={() => onNavClick(item.label)}
          />
        ))}
      </nav>

      <div>
        <a 
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onNavClick('Friends');
            }}
            className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block hover:text-gray-300 transition-colors"
        >
            Friends
        </a>
        <div className="space-y-1">
          {sidebarFriendsData.map(friend => (
            <div key={friend.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 cursor-pointer group">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="relative flex-shrink-0">
                  <img src={friend.avatar} alt={friend.name} className="h-8 w-8 rounded-full" />
                  {friend.status === 'online' && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-gray-800"></span>
                  )}
                </div>
                <div className="overflow-hidden">
                    <p className="font-medium text-sm text-gray-300 truncate">{friend.name}</p>
                    <p className="text-xs truncate">
                      {friend.status === 'online' 
                        ? (friend.currentGame 
                            ? <span className="text-indigo-400">{friend.currentGame.name}</span> 
                            : <span className="text-green-400">Online</span>) 
                        : <span className="text-gray-500">Offline</span>
                      }
                    </p>
                </div>
              </div>
              {friend.status === 'online' && friend.currentGame && (
                <button className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-500 text-white rounded-md px-2 py-1 text-xs font-bold hover:bg-indigo-600">
                    <span>Join</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;