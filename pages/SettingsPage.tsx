
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SettingsToggle: React.FC<{ label: string; description: string; initialValue?: boolean }> = ({ label, description, initialValue = false }) => {
    const [isEnabled, setIsEnabled] = useState(initialValue);
    return (
        <div className="flex items-center justify-between">
            <div>
                <h4 className="font-semibold text-white">{label}</h4>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
            <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isEnabled ? 'bg-indigo-500' : 'bg-gray-600'}`}
            >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
}

const SettingsPage: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <h1 className="text-2xl font-bold">Please log in to view your settings.</h1>
            </div>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl font-bold mb-8">Settings</h1>

            <div className="space-y-10">
                {/* Account Section */}
                <section>
                    <h2 className="text-2xl font-bold text-indigo-400 mb-4 pb-2 border-b-2 border-gray-700">Account</h2>
                    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-400">Email Address</label>
                            <p className="text-lg text-white">{user.email}</p>
                        </div>
                         <div>
                            <label className="text-sm font-semibold text-gray-400">Username</label>
                            <p className="text-lg text-white">{user.username}</p>
                        </div>
                        <div className="pt-2 flex flex-wrap gap-4">
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Change Password</button>
                            <button className="text-red-400 hover:bg-red-500/20 hover:text-red-300 font-bold py-2 px-4 rounded-md transition-colors">Delete Account</button>
                        </div>
                    </div>
                </section>
                
                {/* Privacy Section */}
                <section>
                    <h2 className="text-2xl font-bold text-indigo-400 mb-4 pb-2 border-b-2 border-gray-700">Privacy</h2>
                    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                        <SettingsToggle label="Private Profile" description="Only your friends can see your full profile." />
                        <SettingsToggle label="Show Online Status" description="Allow others to see when you are online." initialValue={true} />
                        <SettingsToggle label="Show Current Game" description="Let friends see which experience you are playing." initialValue={true} />
                    </div>
                </section>

                {/* Notifications Section */}
                <section>
                    <h2 className="text-2xl font-bold text-indigo-400 mb-4 pb-2 border-b-2 border-gray-700">Notifications</h2>
                    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                         <SettingsToggle label="Friend Requests" description="Get notified when someone sends you a friend request." initialValue={true} />
                         <SettingsToggle label="Game Invites" description="Receive notifications when a friend invites you to a game." initialValue={true} />
                         <SettingsToggle label="Platform News" description="Stay up to date with the latest news and events from ATLAX." />
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
