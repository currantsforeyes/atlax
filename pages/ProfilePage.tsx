

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Icon } from '../components/Icon';
import { ICONS } from '../constants';

const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setAvatarUrl(user.avatar_url || '');
    }
  }, [user]);

  // Effect to clean up blob URLs to prevent memory leaks
  useEffect(() => {
    // The return function is the cleanup function
    return () => {
      if (avatarUrl && avatarUrl.startsWith('blob:')) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <h1 className="text-2xl font-bold">Please log in to view your profile.</h1>
        </div>
    );
  }

  const handleEditToggle = () => {
    if (isEditing) {
        // Cancel edit, reset to original values
        if (avatarUrl.startsWith('blob:')) {
            URL.revokeObjectURL(avatarUrl); // Clean up the temporary URL
        }
        setUsername(user.username || '');
        setAvatarUrl(user.avatar_url || '');
        setNewAvatarFile(null);
    }
    setIsEditing(!isEditing);
    setError(null);
  };
  
  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // If a preview is already being shown, revoke the old URL first
      if (avatarUrl.startsWith('blob:')) {
        URL.revokeObjectURL(avatarUrl);
      }
      setNewAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file)); // Show preview
    }
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    let finalAvatarUrl = user.avatar_url;

    if (newAvatarFile) {
        const uploadedUrl = await api.uploadAvatar(user.id, newAvatarFile);
        if (uploadedUrl) {
            finalAvatarUrl = uploadedUrl;
        } else {
            setError("Failed to upload new avatar. Please try again.");
            setIsLoading(false);
            return;
        }
    }
    
    const updatedProfile = await api.updateUserProfile(user.id, { username, avatar_url: finalAvatarUrl });
    
    if (updatedProfile) {
        await refreshUser(); // Refresh global user state
        setIsEditing(false);
    } else {
        setError("Failed to update profile. Please try again.");
    }
    
    setIsLoading(false);
  };


  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="relative">
                    <img 
                        src={avatarUrl} 
                        alt="User Avatar"
                        className="h-32 w-32 rounded-full border-4 border-gray-700 object-cover"
                    />
                    {isEditing && (
                        <button
                            onClick={handleAvatarClick}
                            className="absolute bottom-0 right-0 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full transition-transform hover:scale-110"
                            aria-label="Change avatar"
                        >
                            <Icon svg={ICONS.create} className="h-5 w-5" />
                        </button>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                    {isEditing ? (
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-4xl font-bold bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white w-full"
                        />
                    ) : (
                        <h1 className="text-4xl font-bold">{username}</h1>
                    )}

                    <p className="text-gray-400 mt-2 text-lg">{user.email}</p>
                    
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors disabled:bg-gray-600"
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    onClick={handleEditToggle}
                                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full transition-colors"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleEditToggle}
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                     {error && <p className="text-red-400 mt-4">{error}</p>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProfilePage;
