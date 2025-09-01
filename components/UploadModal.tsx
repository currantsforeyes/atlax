import React, { useState } from 'react';
import type { AvatarCategory } from '../types';
import { Icon } from './Icon';
import { ICONS } from '../constants';

interface UploadModalProps {
  file: File;
  onClose: () => void;
  onUpload: (details: { name: string; category: AvatarCategory }) => void;
}

const categories: AvatarCategory[] = ['Avatars', 'Hats', 'Shirts', 'Pants', 'Accessories'];

const UploadModal: React.FC<UploadModalProps> = ({ file, onClose, onUpload }) => {
  const [itemName, setItemName] = useState(file.name.replace(/\.(glb|gltf)$/i, ''));
  const [itemCategory, setItemCategory] = useState<AvatarCategory>('Accessories');

  const handleSubmit = () => {
    if (!itemName.trim()) {
      alert('Please enter a name for your asset.');
      return;
    }
    onUpload({ name: itemName, category: itemCategory });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Upload New Asset</h2>
        <div className="space-y-4 mb-6">
          <div className="bg-gray-700/50 p-4 rounded-lg flex items-center space-x-3">
             <Icon svg={ICONS.cube} className="h-8 w-8 text-indigo-400 flex-shrink-0" />
             <div className="overflow-hidden">
                <p className="font-semibold text-white truncate">{file.name}</p>
                <p className="text-sm text-gray-400">{Math.round(file.size / 1024)} KB</p>
             </div>
          </div>
          <div>
            <label htmlFor="assetName" className="block text-sm font-medium text-gray-400 mb-1">Asset Name</label>
            <input
              type="text"
              id="assetName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Cool Sunglasses"
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="assetCategory" className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <select
              id="assetCategory"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value as AvatarCategory)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Upload Asset
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;