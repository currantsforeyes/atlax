
import { supabase } from '../lib/supabaseClient';
import type { User, AvatarItem, Review } from '../types';

// --- API Service using Supabase ---
export const api = {
    // --- Profile Management ---
    getProfileForUser: async (userId: string): Promise<User | null> => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching profile:', error.message);
            return null;
        }
        return data as User;
    },

    updateUserProfile: async (userId: string, updates: { username: string; avatar_url: string; }): Promise<User | null> => {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        
        if (error) {
            console.error('Error updating profile:', error.message);
            return null;
        }
        return data as User;
    },
    
    uploadAvatar: async (userId: string, file: File): Promise<string | null> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase
            .storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading avatar:', uploadError.message);
            return null;
        }

        const { data } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(filePath);
            
        return data.publicUrl;
    },

    // --- User Data (Avatars & Items) ---
    getUserAvatar: async (userId: string): Promise<AvatarItem[] | null> => {
        const { data, error } = await supabase
            .from('profiles')
            .select('equipped_items')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user avatar:', error.message);
            return null;
        }
        return data.equipped_items as AvatarItem[] | null;
    },

    saveUserAvatar: async (userId: string, equippedItems: AvatarItem[]): Promise<void> => {
        const { error } = await supabase
            .from('profiles')
            .update({ equipped_items: equippedItems })
            .eq('id', userId);

        if (error) {
            console.error('Error saving user avatar:', error.message);
        }
    },

    getUserItems: async (userId: string): Promise<AvatarItem[]> => {
        const { data, error } = await supabase
            .from('user_items')
            .select('*')
            .eq('user_id', userId);

        if (error) {
            console.error('Error fetching user items:', error.message);
            return [];
        }
        return data as AvatarItem[];
    },

    addUserItem: async (userId: string, item: Partial<AvatarItem>): Promise<AvatarItem | null> => {
        // Destructure only the properties that exist in the database table
        const { name, modelUrl, thumbnailUrl, category, isUserItem } = item;

        const { data, error } = await supabase
            .from('user_items')
            .insert({ 
                user_id: userId,
                name,
                modelUrl,
                thumbnailUrl,
                category,
                isUserItem
            })
            .select()
            .single();

        if (error) {
            console.error('Error adding user item:', error.message);
            return null;
        }
        return data as AvatarItem;
    },

    // --- Reviews ---
    getReviewsForExperience: async (experienceId: string): Promise<Review[]> => {
        const { data, error } = await supabase
            .from('reviews')
            .select(`
                *,
                profile:profiles(username, avatar_url)
            `)
            .eq('experienceId', experienceId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching reviews:', error.message);
            return [];
        }

        // Map the result to the Review type
        return data.map((r: any) => ({
            id: r.id,
            author: r.profile.username,
            authorAvatarUrl: r.profile.avatar_url,
            rating: r.rating,
            comment: r.comment,
            experienceId: r.experienceId,
        }));
    },

    addUserReview: async (review: Omit<Review, 'id' | 'author' | 'authorAvatarUrl'> & { userId: string }): Promise<Review | null> => {
        const { userId, ...reviewData } = review;
        const { data, error } = await supabase
            .from('reviews')
            .insert({ ...reviewData, user_id: userId })
            .select()
            .single();

        if (error) {
            console.error('Error adding review:', error.message);
            return null;
        }

        // Fetch the user's profile to populate author info for the immediate UI update
        const userProfile = await api.getProfileForUser(userId);
        if (!userProfile) return null;

        return {
            ...data,
            author: userProfile.username,
            authorAvatarUrl: userProfile.avatar_url,
        } as Review;
    },
};