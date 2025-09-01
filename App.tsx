
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ExperienceDetail from './components/ExperienceDetail';
import DiscoverPage from './pages/DiscoverPage';
import HomePage from './pages/HomePage';
import AvatarPage from './pages/AvatarPage';
import type { Experience } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import FriendsPage from './pages/FriendsPage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';
import PlaceholderPage from './pages/PlaceholderPage';

const AppContent: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [activePage, setActivePage] = useState('Home');
  const { user } = useAuth();

  useEffect(() => {
    // Redirect to profile page after successful login/signup
    if (user && activePage === 'Auth') {
      handleNavClick('Profile');
    }
  }, [user, activePage]);

  const handleExperienceSelect = useCallback((experience: Experience) => {
    setSelectedExperience(experience);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedExperience(null);
  }, []);

  const handleNavClick = useCallback((page: string) => {
    setSelectedExperience(null);
    setActivePage(page);
  }, []);

  const renderContent = () => {
    if (selectedExperience) {
      return <ExperienceDetail experience={selectedExperience} onBack={handleBack} onExperienceClick={handleExperienceSelect} onNavClick={handleNavClick}/>;
    }

    switch (activePage) {
      case 'Home':
        return <HomePage onExperienceClick={handleExperienceSelect} onNavClick={handleNavClick} />;
      case 'Discover':
        return <DiscoverPage onExperienceClick={handleExperienceSelect} />;
      case 'Avatar':
        return <AvatarPage onNavClick={handleNavClick} />;
      case 'Auth':
        return <AuthPage />;
      case 'Profile':
        return <ProfilePage />;
      case 'Friends':
        return <FriendsPage />;
      case 'Settings':
        return <SettingsPage />;
      case 'Billing':
        return <BillingPage />;
      case 'Create':
      case 'Store':
        return <PlaceholderPage title={activePage} />;
      default:
        return <HomePage onExperienceClick={handleExperienceSelect} onNavClick={handleNavClick} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar activePage={activePage} onNavClick={handleNavClick} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onNavClick={handleNavClick} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};


const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
