
import React, { useMemo } from 'react';
import type { Experience } from '../types';
import { ICONS } from '../constants';
import { Icon } from './Icon';

interface ExperienceCardProps {
  experience: Experience;
  onClick: (experience: Experience) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onClick }) => {
  const { title, creator, creatorAvatarUrl, thumbnailUrl, playerCount } = experience;
  
  const formattedPlayerCount = useMemo(() => new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(playerCount), [playerCount]);

  return (
    <button onClick={() => onClick(experience)} className="bg-gray-800 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-1 text-left w-full">
      <div className="relative">
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-40 object-cover transition-all duration-300 group-hover:brightness-50" 
        />
        
        {/* Player count overlay */}
        <div 
          className="absolute bottom-2 right-2 bg-gray-900/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full z-10"
          aria-label={`${playerCount.toLocaleString()} players online`}
        >
          <span>{formattedPlayerCount}</span>
        </div>

        {/* Hover overlay with centered play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-indigo-600/80 text-white p-3 rounded-full shadow-lg transition-transform duration-300 scale-90 group-hover:scale-100">
            <Icon svg={ICONS.play} className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate text-white">{title}</h3>
        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-400">
          <img src={creatorAvatarUrl} alt={creator} className="h-5 w-5 rounded-full" />
          <span>{creator}</span>
        </div>
      </div>
    </button>
  );
};

export default React.memo(ExperienceCard);
