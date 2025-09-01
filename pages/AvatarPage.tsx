
import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { AvatarItem, AvatarCategory } from '../types';
import { avatarItems as initialAvatarItems } from '../data';
import CharacterStudio from '../components/CharacterStudio';
import { Icon } from '../components/Icon';
import { ICONS } from '../constants';
import UploadModal from '../components/UploadModal';
import ReadyPlayerMeCreator from '../components/ReadyPlayerMeCreator';
import ErrorBoundary from '../components/ErrorBoundary';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

const categoryStructure: Record<string, AvatarCategory[]> = {
    Avatars: ['Avatars'],
    Body: [],
    Clothing: ['Shirts', 'Pants'],
    Accessories: ['Hats', 'Accessories'],
};
const topLevelCategories = ['Avatars', 'My Items', 'Body', 'Clothing', 'Accessories'];

const PreviewErrorFallback: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-900/50 rounded-lg">
        <Icon svg={ICONS.avatar} className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="text-lg font-bold text-gray-400">Oops! Could not load preview.</h3>
        <p className="text-sm">There was an issue loading the 3D model. Please try another item or refresh the page.</p>
    </div>
);

const AvatarPage: React.FC<{ onNavClick: (page: string) => void }> = ({ onNavClick }) => {
  const [allItems, setAllItems] = useState<AvatarItem[]>(initialAvatarItems);
  const [selectedTopCategory, setSelectedTopCategory] = useState<string>('Avatars');
  const [selectedSubCategory, setSelectedSubCategory] = useState<AvatarCategory | 'All'>('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const [equippedItems, setEquippedItems] = useState<AvatarItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUserData = async () => {
        if (user) {
            const [userItems, savedAvatar] = await Promise.all([
                api.getUserItems(user.id),
                api.getUserAvatar(user.id),
            ]);
            setAllItems([...initialAvatarItems, ...userItems]);

            if (savedAvatar && savedAvatar.length > 0) {
                setEquippedItems(savedAvatar);
            } else {
                const defaultAvatar = initialAvatarItems.find(item => item.id === 'avatar_male');
                setEquippedItems(defaultAvatar ? [defaultAvatar] : []);
            }
        } else {
            setAllItems(initialAvatarItems);
            const defaultAvatar = initialAvatarItems.find(item => item.id === 'avatar_male');
            setEquippedItems(defaultAvatar ? [defaultAvatar] : []);
        }
    };
    loadUserData();
  }, [user]);

  const handleTopCategorySelect = (category: string) => {
    setSelectedTopCategory(category);
    setSelectedSubCategory('All');
  };

  const handleItemToggle = (item: AvatarItem) => {
    if (!user) return;
    setEquippedItems(prev => {
        const isAlreadyEquipped = prev.some(equipped => equipped.id === item.id);

        if (isAlreadyEquipped) {
            if (item.category === 'Avatars') return prev;
            return prev.filter(equipped => equipped.id !== item.id);
        } else {
            let newEquipped = [...prev];
            if(item.category === 'Avatars') {
                 newEquipped = newEquipped.filter(equipped => equipped.category !== 'Avatars');
            } else if (item.category !== 'Accessories' && item.category !== 'Hats') {
                newEquipped = newEquipped.filter(equipped => equipped.category !== item.category);
            }
            newEquipped.push(item);
            return newEquipped;
        }
    });
  };

  const handleReset = () => {
    if (!user) return;
    const defaultAvatar = allItems.find(item => item.id === 'avatar_male');
    setEquippedItems(defaultAvatar ? [defaultAvatar] : []);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    await api.saveUserAvatar(user.id, equippedItems);
    setIsSaving(false);
  };
  
  const handleUploadClick = () => {
    if (!user) {
        onNavClick('Auth');
        return;
    };
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          setFileToUpload(file);
          setIsModalOpen(true);
      }
      if (event.target) {
          event.target.value = '';
      }
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
      setFileToUpload(null);
  };

  const handleAssetUpload = async (details: { name: string; category: AvatarCategory }) => {
      if (!fileToUpload || !user) return;

      const newItemData: Omit<AvatarItem, 'id'> = {
          name: details.name,
          modelUrl: URL.createObjectURL(fileToUpload), // Temporary for display
          category: details.category,
          isUserItem: true,
      };
      
      // In a real app, you would upload the file to Supabase Storage and get a URL
      // For now, we'll keep the blob URL and save other data.
      const savedItem = await api.addUserItem(user.id, newItemData as AvatarItem);
      
      if(savedItem) {
          const newItem = { ...savedItem, modelUrl: newItemData.modelUrl };
          setAllItems(prevItems => [...prevItems, newItem]);
          
          if (newItem.category === 'Avatars') {
            handleItemToggle(newItem);
            setSelectedTopCategory('Avatars');
          } else {
            handleItemToggle(newItem);
            setSelectedTopCategory('My Items');
          }
      }
      
      handleCloseModal();
  };

  const handleAvatarCreated = async (url: string) => {
    if (!user) return;
    const newAvatarData: Omit<AvatarItem, 'id'> = {
        name: 'My New Avatar',
        modelUrl: url,
        category: 'Avatars',
        isUserItem: true,
        thumbnailUrl: url.replace('.glb', '.png'),
    };
    const savedAvatar = await api.addUserItem(user.id, newAvatarData as AvatarItem);

    if (savedAvatar) {
        setAllItems(prev => [...prev, savedAvatar]);
        handleItemToggle(savedAvatar);
    }
    setIsCreatorOpen(false);
    setSelectedTopCategory('Avatars');
  };

  useEffect(() => {
    return () => {
      allItems.forEach(item => {
        if (item.modelUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.modelUrl);
        }
      });
    };
  }, [allItems]);

  const defaultAvatars = useMemo(() => 
    allItems.filter(item => item.category === 'Avatars' && !item.isUserItem), 
  [allItems]);

  const userAvatars = useMemo(() => 
      allItems.filter(item => item.category === 'Avatars' && item.isUserItem),
  [allItems]);
  
  const itemsToShow = useMemo(() => {
    if (selectedTopCategory === 'Avatars') return [];
    if (selectedTopCategory === 'My Items') {
        return allItems.filter(item => item.isUserItem && item.category !== 'Avatars');
    }
    const targetCategories = categoryStructure[selectedTopCategory];
    if (!targetCategories) return [];
    const itemsInTopCategory = allItems.filter(item => targetCategories.includes(item.category) && !item.isUserItem);
    if (selectedSubCategory === 'All') return itemsInTopCategory;
    return itemsInTopCategory.filter(item => item.category === selectedSubCategory);
  }, [allItems, selectedTopCategory, selectedSubCategory]);

  const currentSubCategories = categoryStructure[selectedTopCategory];

  const renderItemGrid = (items: AvatarItem[]) => (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {items.map(item => {
        const isEquipped = equippedItems.some(i => i.id === item.id);
        return (
          <button
            key={item.id}
            onClick={() => handleItemToggle(item)}
            disabled={!user}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 group ${isEquipped ? 'border-indigo-500 scale-105 shadow-lg shadow-indigo-500/20' : 'border-transparent hover:border-gray-600'} ${item.thumbnailUrl ? 'bg-gray-900' : 'flex flex-col items-center justify-center bg-gray-700/50'} ${!user && 'cursor-not-allowed opacity-70'}`}
          >
            {item.thumbnailUrl ? <img src={item.thumbnailUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> : <Icon svg={ICONS.cube} className="w-1/2 h-1/2 text-gray-500 group-hover:text-indigo-400 transition-colors" />}
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 text-center truncate">{item.name}</div>
            {isEquipped && user && (
              <div className="absolute top-1 right-1 bg-indigo-500 text-white rounded-full p-1 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <input type="file" accept=".glb,.gltf" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      <div className="flex flex-col lg:flex-row h-full gap-8 animate-fade-in">
        <div className="lg:w-1/2 bg-gray-800 rounded-2xl p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Avatar</h2>
          <div className="flex-1 min-h-[400px]">
            <ErrorBoundary fallback={<PreviewErrorFallback />}>
              <CharacterStudio equippedItems={equippedItems} />
            </ErrorBoundary>
          </div>
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="w-full">
                {equippedItems.filter(i => i.category !== 'Avatars').length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2">
                        {equippedItems.filter(i => i.category !== 'Avatars').map(item => (
                            <div key={item.id} className="flex items-center space-x-2 bg-gray-700/80 py-1 px-3 rounded-full">
                                <span className="text-sm font-semibold text-gray-300">{item.category}:</span>
                                <span className="text-sm text-white">{item.name}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm text-center h-7">No accessories equipped.</p>
                )}
            </div>
            {user ? (
                 <div className="flex justify-center gap-4">
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'Saving...' : 'Save Avatar'}
                    </button>
                    <button 
                        onClick={handleReset}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-bold p-3 rounded-full transition-colors"
                        aria-label="Reset Avatar"
                    >
                        <Icon svg={ICONS.reset} className="h-6 w-6" />
                    </button>
                </div>
            ) : (
                <div className="text-center bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-300">Please <button onClick={() => onNavClick('Auth')} className="font-bold text-indigo-400 hover:underline">login</button> to save your avatar.</p>
                </div>
            )}
          </div>
        </div>

        <div className="lg:w-1/2 bg-gray-800 rounded-2xl p-6 flex flex-col">
           <div className="border-b border-gray-700 mb-4">
              <div className="flex flex-wrap -mb-px">
                {topLevelCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleTopCategorySelect(category)}
                    className={`py-3 px-4 font-semibold transition-colors ${selectedTopCategory === category ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white border-b-2 border-transparent'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
          </div>
          
          {currentSubCategories && currentSubCategories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => setSelectedSubCategory('All')}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedSubCategory === 'All' ? 'bg-indigo-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                >
                    All
                </button>
                {currentSubCategories.map(subCat => (
                     <button
                        key={subCat}
                        onClick={() => setSelectedSubCategory(subCat)}
                        className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${selectedSubCategory === subCat ? 'bg-indigo-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                    >
                        {subCat}
                    </button>
                ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {selectedTopCategory === 'Avatars' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">Default Avatars</h3>
                  {renderItemGrid(defaultAvatars)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">My Saved Avatars</h3>
                  {userAvatars.length > 0 ? (
                    renderItemGrid(userAvatars)
                  ) : (
                    <div className="text-center text-gray-500 bg-gray-700/20 p-4 rounded-lg">
                      <p className="text-sm">Your custom avatars will appear here after you create or upload them.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : itemsToShow.length > 0 ? (
                renderItemGrid(itemsToShow)
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <Icon svg={ICONS.search} className="w-12 h-12 text-gray-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-400">No Items Found</h3>
                    <p className="text-sm">
                        {selectedTopCategory === 'My Items' 
                            ? 'Your uploaded clothing and accessories will appear here.' 
                            : (selectedTopCategory === 'Body' 
                                ? 'This category is under development. Check back soon!' 
                                : 'There are no items in this category yet.')
                        }
                    </p>
                </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                  onClick={() => user ? setIsCreatorOpen(true) : onNavClick('Auth')}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-full transition-colors text-sm"
                  aria-label="Create a new avatar with Ready Player Me"
              >
                  <Icon svg={ICONS.avatar} className="h-5 w-5" />
                  <span>Create New Avatar</span>
              </button>
              <button
                  onClick={handleUploadClick}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-full transition-colors text-sm"
                  aria-label="Upload a custom asset"
              >
                  <Icon svg={ICONS.upload} className="h-5 w-5" />
                  <span>Upload My Item</span>
              </button>
          </div>
        </div>
      </div>
      {isModalOpen && fileToUpload && ( <UploadModal file={fileToUpload} onClose={handleCloseModal} onUpload={handleAssetUpload} /> )}
      {isCreatorOpen && ( <ReadyPlayerMeCreator onAvatarExported={handleAvatarCreated} onClose={() => setIsCreatorOpen(false)} /> )}
    </>
  );
};

export default AvatarPage;
