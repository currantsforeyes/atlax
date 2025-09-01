
import React, { useMemo } from 'react';
import ExperienceGrid from '../components/ExperienceGrid';
import { Icon } from '../components/Icon';
import { ICONS } from '../constants';
import { experiences } from '../data';
import type { Experience } from '../types';

interface DiscoverPageProps {
  onExperienceClick: (experience: Experience) => void;
}

const DiscoverPage: React.FC<DiscoverPageProps> = ({ onExperienceClick }) => {
  const featuredExperience = experiences.find(e => e.id === '10'); // 'Downtown Life' is a good feature candidate

  const popularExperiences = useMemo(() => [...experiences].reverse(), []);
  const newAndNoteworthy = useMemo(() => experiences.slice(2, 14), []);

  if (!featuredExperience) {
    return <div>Error: Could not find featured experience.</div>;
  }

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Featured Experience Hero */}
      <section className="relative h-[450px] rounded-2xl overflow-hidden flex items-end p-8 text-white bg-cover bg-center" style={{ backgroundImage: `url(${featuredExperience.thumbnailUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-xl">
          <h1 className="text-5xl font-bold drop-shadow-lg">{featuredExperience.title}</h1>
          <p className="mt-4 text-lg text-gray-200 drop-shadow-md leading-relaxed line-clamp-3">
            {featuredExperience.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
             <button
                onClick={() => onExperienceClick(featuredExperience)}
                className="bg-indigo-500 hover:bg-indigo-600 font-bold py-3 px-6 rounded-full flex items-center justify-center space-x-2 text-lg transition-transform hover:scale-105"
            >
                <Icon svg={ICONS.play} className="h-6 w-6" />
                <span>Play Now</span>
            </button>
             <div className="flex items-center space-x-2 bg-gray-900/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <Icon svg={ICONS.users} className="h-5 w-5 text-gray-300" />
                <span className="font-semibold text-gray-200">{featuredExperience.playerCount.toLocaleString()} Playing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Grids */}
      <ExperienceGrid title="Recommended For You" experiences={experiences} onExperienceClick={onExperienceClick} />
      <ExperienceGrid title="Popular Experiences" experiences={popularExperiences} onExperienceClick={onExperienceClick} />
      <ExperienceGrid title="New & Noteworthy" experiences={newAndNoteworthy} onExperienceClick={onExperienceClick} />
    </div>
  );
};

export default DiscoverPage;
