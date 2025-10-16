import React from 'react';

interface IconProps {
  className?: string;
}

const PuzzleIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V5H6c-1.1 0-2 .9-2 2v4H3.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5H4v4c0 1.1.9 2 2 2h4v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h4c1.1 0 2-.9 2-2v-4h1.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
    </svg>
);

export default PuzzleIcon;
