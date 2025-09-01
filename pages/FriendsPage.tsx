

import React, { useState, useMemo } from 'react';
import { sidebarFriendsData } from '../data';
import { Icon } from '../components/Icon';
import { ICONS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

type FriendStatus = 'online' | 'offline';
type FriendTab = 'All' | 'Online' | 'Pending';

const FriendsPage: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<FriendTab>('All');
    const [searchTerm, setSearchTerm] = useState('');

    const allFriends = useMemo(() => [
        ...sidebarFriendsData,
        { name: 'Blaze', avatar: 'https://picsum.photos/seed/friend6/80/80', status: 'online', currentGame: { name: 'Asphalt Legends', id: '12' } },
        { name: 'Serenity', avatar: 'https://picsum.photos/seed/friend7/80/80', status: 'online' },
        { name: 'Maverick', avatar: 'https://picsum.photos/seed/friend8/80/80', status: 'offline' },
        { name: 'Phoenix', avatar: 'https://picsum.photos/seed/friend9/80/80', status: 'offline' },
    ], []);

    const pendingRequests = useMemo(() => [
        { name: 'Kairo', avatar: 'https://picsum.photos/seed/friend10/80/80', status: 'offline' },
        { name: 'Lyra', avatar: 'https://picsum.photos/seed/friend11/80/80', status: 'offline' },
    ], []);
    
    const filteredFriends = useMemo(() => {
        let friends;
        switch (activeTab) {
            case 'Online':
                friends = allFriends.filter(f => f.status === 'online');
                break;
            case 'Pending':
                friends = pendingRequests;
                break;
            case 'All':
            default:
                friends = allFriends;
                break;
        }
        if (searchTerm) {
            return friends.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return friends;
    }, [activeTab, searchTerm, allFriends, pendingRequests]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <h1 className="text-2xl font-bold">Please log in to see your friends.</h1>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-6">Friends</h1>

            <div className="bg-gray-800 rounded-2xl p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <div className="border-b border-gray-700">
                        <div className="flex flex-wrap -mb-px">
                            {(['All', 'Online', 'Pending'] as FriendTab[]).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-3 px-4 font-semibold transition-colors ${activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white border-b-2 border-transparent'}`}
                                >
                                    {tab} {tab === 'Pending' && `(${pendingRequests.length})`}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Icon svg={ICONS.search} className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Find a friend..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-700/50 border border-transparent focus:border-indigo-500 focus:ring-indigo-500 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 transition"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFriends.map(friend => (
                        <div key={friend.name} className="bg-gray-700/50 p-4 rounded-lg flex flex-col items-center text-center">
                            <div className="relative">
                                <img src={friend.avatar} alt={friend.name} className="h-20 w-20 rounded-full mb-3" />
                                {friend.status === 'online' && activeTab !== 'Pending' && (
                                    <span className="absolute bottom-3 right-0 block h-4 w-4 rounded-full bg-green-400 border-2 border-gray-700"></span>
                                )}
                            </div>
                            <p className="font-bold text-lg text-white truncate">{friend.name}</p>
                            {activeTab !== 'Pending' ? (
                                <p className="text-sm truncate w-full">
                                    {friend.status === 'online'
                                        ? (friend.currentGame
                                            ? <span className="text-indigo-400">{friend.currentGame.name}</span>
                                            : <span className="text-green-400">Online</span>)
                                        : <span className="text-gray-500">Offline</span>
                                    }
                                </p>
                            ) : (
                                <div className="mt-2 flex gap-2">
                                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-md text-xs">Accept</button>
                                    <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded-md text-xs">Decline</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {filteredFriends.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        <p>No friends found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsPage;
