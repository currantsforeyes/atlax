
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import type { User } from '../types';
import { api } from '../services/api';
import { supabase } from '../lib/supabaseClient';
import type { AuthError, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

// FIX: Define a specific type for email-based credentials by extracting it from the Supabase union type.
// This resolves the error where 'email' might not exist on 'SignUpWithPasswordCredentials'.
type EmailPasswordAuthCredentials = Extract<SignUpWithPasswordCredentials, { email: string }>;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: EmailPasswordAuthCredentials) => Promise<{ error: AuthError | null }>;
  signUp: (credentials: EmailPasswordAuthCredentials & { username: string }) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
        const profile = await api.getProfileForUser(session.user.id);
        setUser(profile);
    } else {
        setUser(null);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUserProfile(); // Initial fetch
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
            api.getProfileForUser(session.user.id).then(profile => setUser(profile));
        } else if (event === 'SIGNED_OUT') {
            setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (credentials: EmailPasswordAuthCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    return { error };
  };

  const signUp = async (credentials: EmailPasswordAuthCredentials & { username: string }) => {
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          username: credentials.username,
          avatar_url: `https://api.dicebear.com/8.x/bottts/svg?seed=${credentials.username}`,
        }
      }
    });
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  
  const refreshUser = async () => {
    await fetchUserProfile();
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signUp, logout, refreshUser }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
