
import React, { useState, useContext } from 'react';
import AuthModal from './AuthModal';
import { AuthContext } from '../contexts/AuthContext';
import { Page } from '../types';
import Button from './Button';

interface HeaderProps {
  navigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const XP_PER_LEVEL = 100;
  const level = user ? Math.floor(user.xp / XP_PER_LEVEL) + 1 : 1;
  const xpForCurrentLevel = user ? user.xp % XP_PER_LEVEL : 0;
  const progressPercentage = (xpForCurrentLevel / XP_PER_LEVEL) * 100;

  return (
    <>
      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div 
              className="flex-shrink-0 cursor-pointer"
              onClick={() => navigate('home')}
            >
              <h1 className="text-3xl font-bold text-cyan-400 font-fira-code tracking-wider">
                &lt;CodeQuest /&gt;
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <div className="flex items-center space-x-4">
                     <div className="w-48">
                        <div className="text-sm text-gray-300 mb-1">Level {level} ({xpForCurrentLevel}/{XP_PER_LEVEL} XP)</div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)]" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                     </div>
                    <span className="text-lime-400 font-semibold">💰 {user.coins}</span>
                  </div>
                  <button onClick={() => navigate('challenge')} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Challenges</button>
                  <button onClick={() => navigate('profile')} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Profile</button>
                </>
              ) : (
                <Button onClick={() => setIsModalOpen(true)}>Login / Register</Button>
              )}
            </div>
             <div className="md:hidden">
                <button onClick={() => setIsModalOpen(true)} className="text-gray-300 hover:text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
