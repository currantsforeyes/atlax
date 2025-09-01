
import React, { useState, useEffect, useMemo } from 'react';
import type { Experience } from '../types';
import ExperienceCard from './ExperienceCard';
import { ICONS } from '../constants';
import { Icon } from './Icon';

interface ExperienceGridProps {
  title: string;
  experiences: Experience[];
  onExperienceClick: (experience: Experience) => void;
}

const genres: (Experience['genre'] | 'All')[] = ['All', 'Adventure', 'Roleplay', 'Combat', 'Simulation', 'Obby', 'Racing'];
const PAGE_SIZE = 12;

const ExperienceGrid: React.FC<ExperienceGridProps> = ({ title, experiences, onExperienceClick }) => {
  const [selectedGenre, setSelectedGenre] = useState<Experience['genre'] | 'All'>('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredExperiences = useMemo(() => (
    selectedGenre === 'All'
    ? experiences
    : experiences.filter(exp => exp.genre === selectedGenre)
  ), [experiences, selectedGenre]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE); // Reset pagination when genre changes
  }, [selectedGenre]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + PAGE_SIZE);
  };

  const visibleExperiences = filteredExperiences.slice(0, visibleCount);

  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="relative flex items-center">
          <Icon svg={ICONS.filter} className="h-5 w-5 text-gray-400 absolute left-3 pointer-events-none" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value as Experience['genre'] | 'All')}
            className="bg-gray-700/50 border border-transparent hover:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 rounded-full py-2 pl-10 pr-8 text-white transition appearance-none cursor-pointer"
            aria-label="Filter experiences by genre"
          >
            {genres.map(genre => (
              <option key={genre} value={genre} className="bg-gray-800 text-white">
                {genre}
              </option>
            ))}
          </select>
          <Icon svg={ICONS.chevronDown} className="h-4 w-4 text-gray-400 absolute right-3 pointer-events-none" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {visibleExperiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} onClick={onExperienceClick} />
        ))}
      </div>
      {visibleCount < filteredExperiences.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default ExperienceGrid;
