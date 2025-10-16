import React from 'react';

interface IconProps {
  className?: string;
}

const OopIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5L2 17zM2 12l10 5 10-5-10-5L2 12z"/>
    </svg>
);

export default OopIcon;
