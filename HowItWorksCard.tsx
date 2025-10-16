
import React from 'react';

interface HowItWorksCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl hover:shadow-lime-500/20">
      <div className="flex justify-center items-center mb-4 text-lime-400">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-lime-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default HowItWorksCard;
