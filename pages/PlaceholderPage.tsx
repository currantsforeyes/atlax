import React from 'react';
import { ICONS } from '../constants';
import { Icon } from '../components/Icon';

interface PlaceholderPageProps {
    title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 animate-fade-in">
        <Icon svg={ICONS.logo} className="h-24 w-24 text-gray-700 mb-4" />
        <h1 className="text-4xl font-bold text-gray-400">{title}</h1>
        <p className="mt-2 text-lg">This page is under construction.</p>
        <p>Check back later for more amazing content!</p>
    </div>
  );
};

export default PlaceholderPage;
