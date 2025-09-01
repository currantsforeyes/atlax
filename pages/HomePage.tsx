
import React, { useMemo } from 'react';
import type { Experience } from '../types';
import { experiences, friendsActivityData, newsData } from '../data';
import { Icon } from '../components/Icon';
import { ICONS } from '../constants';
import ExperienceCard from '../components/ExperienceCard';
import NewsCard from '../components/NewsCard';
import { useAuth } from '../contexts/AuthContext';

interface HomePageProps {
  onExperienceClick: (experience: Experience) => void;
  onNavClick: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onExperienceClick, onNavClick }) => {
  const recentlyPlayed = useMemo(() => experiences.slice(0, 5), []);
  const { user } = useAuth();
  
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Welcome Header */}
      <section>
        <h1 className="text-4xl font-bold">
            {user ? `Welcome back, ${user.username}!` : 'Welcome to ATLAX!'}
        </h1>
        <p className="text-lg text-gray-400 mt-2">
            {user ? 'Ready to jump back into the action?' : 'Discover new experiences and connect with friends.'}
        </p>
      </section>

      {/* Jump Back In */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Jump Back In</h2>
        <div className="flex space-x-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {recentlyPlayed.map(exp => (
                <div key={exp.id} className="w-64 flex-shrink-0">
                    <ExperienceCard experience={exp} onClick={onExperienceClick} />
                </div>
            ))}
            <div className="w-64 flex-shrink-0">
                <button
                    onClick={() => onNavClick('Discover')}
                    className="w-full h-full bg-gray-800 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1"
                    aria-label="See all recently played experiences"
                >
                    <Icon svg={ICONS.arrowRight} className="h-10 w-10 mb-2" />
                    <span className="font-bold text-lg">See All</span>
                </button>
            </div>
        </div>
      </section>

      {/* Friends Activity */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Friends Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friendsActivityData.map(activity => (
                <div key={activity.friendName} className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
                    <img src={activity.friendAvatarUrl} alt={activity.friendName} className="h-12 w-12 rounded-full flex-shrink-0" />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm text-gray-300">
                            <span className="font-bold text-white">{activity.friendName}</span> is playing
                        </p>
                        <p className="font-semibold truncate text-indigo-400">{activity.experience.title}</p>
                    </div>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold p-3 rounded-full transition-transform hover:scale-110" aria-label={`Join ${activity.friendName}`}>
                        <Icon svg={ICONS.join} className="h-5 w-5"/>
                    </button>
                </div>
            ))}
        </div>
      </section>

      {/* Platform News */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Platform News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.map(article => (
                <NewsCard key={article.id} article={article} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
