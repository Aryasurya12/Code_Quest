import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent mt-12">
      <div className="container mx-auto py-6 px-4 text-center text-gray-400 border-t border-gray-700/50">
        <p>&copy; {new Date().getFullYear()} CodeQuest. All rights reserved.</p>
        <p className="text-sm mt-1">Learn Python, The Fun Way!</p>
      </div>
    </footer>
  );
};

export default Footer;