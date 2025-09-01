import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from '../components/Icon';
import { ICONS } from '../constants';

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    let authError = null;

    if (isLoginView) {
      const { error } = await login({ email, password });
      authError = error;
    } else {
      const { error } = await signUp({ email, password, username });
      if (!error) {
        setMessage('Account created! Please check your email for a confirmation link.');
      }
      authError = error;
    }

    if (authError) {
      setError(authError.message);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
        <div className="text-center">
            <Icon svg={ICONS.logo} className="h-12 w-12 text-indigo-400 mx-auto mb-2"/>
            <h1 className="text-3xl font-bold text-white">
                {isLoginView ? 'Welcome Back!' : 'Create Your Account'}
            </h1>
            <p className="text-gray-400">
                {isLoginView ? 'Log in to continue to ATLAX' : 'Join the ATLAX community'}
            </p>
        </div>

        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-md text-sm">{error}</div>}
        {message && <div className="bg-green-500/20 text-green-300 p-3 rounded-md text-sm">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <div>
              <label htmlFor="username" className="text-sm font-bold text-gray-400 block mb-2">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 transition"
                placeholder="Choose a username"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-400 block mb-2">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-400 block mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || (message && !error)}
              className="w-full py-3 px-4 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Processing...' : (isLoginView ? 'Log In' : 'Create Account')}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-400">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
                setIsLoginView(!isLoginView);
                setError(null);
                setMessage(null);
            }}
            className="font-medium text-indigo-400 hover:underline ml-1"
          >
            {isLoginView ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;