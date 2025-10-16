
import React from 'react';

interface TrophyIconProps {
  className?: string;
}

const TrophyIcon: React.FC<TrophyIconProps> = ({ className = 'h-24 w-24' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.5 2H4.5A2.5 2.5 0 0 0 2 4.5v2A2.5 2.5 0 0 0 4.5 9H5v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9h.5a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 19.5 2zM17 20H7V9h10v11z"></path>
      <path d="M14 6.5h-4a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"></path>
    </svg>
);

export default TrophyIcon;
