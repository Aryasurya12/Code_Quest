
import React, { useContext } from 'react';
import Button from '../components/Button';
import HowItWorksCard from '../components/HowItWorksCard';
import CodeIcon from '../components/icons/CodeIcon';
import LevelUpIcon from '../components/icons/LevelUpIcon';
import RewardIcon from '../components/icons/RewardIcon';
import { Page } from '../types';
import { AuthContext } from '../contexts/AuthContext';

interface HomePageProps {
  navigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-cyan-400">Code</span><span className="text-lime-400">Quest</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Unlock Your Python Potential. Learn by doing with fun, gamified challenges.
        </p>
        <Button onClick={() => navigate(user ? 'challenge' : 'home')}>Start Your Quest</Button>
      </section>

      {/* How It Works Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <HowItWorksCard 
            icon={<CodeIcon />}
            title="Learn by Doing"
            description="Solve real Python challenges step-by-step in our interactive editor."
          />
          <HowItWorksCard 
            icon={<LevelUpIcon />}
            title="Level Up"
            description="Unlock new, more difficult levels after successfully completing challenges."
          />
          <HowItWorksCard 
            icon={<RewardIcon />}
            title="Earn Rewards"
            description="Gain valuable XP and shiny coins for each successful code submission."
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
