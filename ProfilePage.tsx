
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Page } from '../types';
import Button from '../components/Button';
import { challenges } from '../data/challenges';

interface ProfilePageProps {
  navigate: (page: Page) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigate }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('home');
  };

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-xl text-gray-300">You are not logged in.</p>
        <Button onClick={() => navigate('home')} className="mt-4">Back to Home</Button>
      </div>
    );
  }

  const XP_PER_LEVEL = 100;
  const level = Math.floor(user.xp / XP_PER_LEVEL) + 1;
  const xpForCurrentLevel = user.xp % XP_PER_LEVEL;
  const progressPercentage = (xpForCurrentLevel / XP_PER_LEVEL) * 100;

  return (
    <div className="max-w-2xl mx-auto bg-gray-800/50 border border-gray-700 rounded-lg shadow-2xl shadow-cyan-500/10 p-8">
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-lime-500 mx-auto mb-4 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{user.username.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className="text-4xl font-bold text-white">{user.username}</h2>
        <p className="text-gray-400">{user.email}</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-lg font-semibold text-cyan-300">Level {level}</span>
            <span className="text-sm text-gray-400">{user.xp} Total XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
                className="bg-gradient-to-r from-cyan-500 to-lime-500 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-right text-sm text-gray-400 mt-1">{xpForCurrentLevel} / {XP_PER_LEVEL} XP to next level</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-lime-400">{user.coins}</p>
                <p className="text-gray-400">Coins Earned</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-lime-400">{user.completedChallenges.length} / {challenges.length}</p>
                <p className="text-gray-400">Challenges Completed</p>
            </div>
        </div>

        <div className="pt-6 text-center">
            <Button onClick={handleLogout} variant="primary">Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
