export interface Experience {
  id: string;
  title: string;
  creator: string;
  creatorAvatarUrl: string;
  thumbnailUrl: string;
  playerCount: number;
  genre: 'Adventure' | 'Roleplay' | 'Combat' | 'Simulation' | 'Obby' | 'Racing';
  description: string;
}

export interface User {
    id: string;
    username: string;
    avatar_url: string;
    currency: number;
    email?: string;
}

export interface Review {
    id: string;
    author: string;
    authorAvatarUrl: string;
    rating: number;
    comment: string;
    experienceId: string;
}

export interface Friend {
    name: string;
    avatar: string;
    status: 'online' | 'offline';
    currentGame?: {
        name: string;
        id: string;
    };
}

export interface FriendActivity {
    friendName: string;
    friendAvatarUrl: string;
    experience: Experience;
}

export interface NewsArticle {
    id: string;
    title: string;
    category: string;
    summary: string;
    imageUrl: string;
}

export type AvatarCategory = 'Avatars' | 'Hats' | 'Shirts' | 'Pants' | 'Accessories';

export interface AvatarItem {
  id: string;
  name: string;
  modelUrl: string;
  thumbnailUrl?: string; // Optional thumbnail image
  category: AvatarCategory;
  isUserItem?: boolean; // To identify user-uploaded/created items
}

export interface Transaction {
  id: string;
  date: string; // Using string to avoid object rendering errors
  description: string;
  amount: number; // Negative for debits, positive for credits
}
