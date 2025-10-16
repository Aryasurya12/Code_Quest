import React from 'react';

interface IconProps {
  className?: string;
}

const ProceduralIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M9.5 5.75a.75.75 0 00-1.5 0v4.586l-1.62-1.62a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06L9.5 10.336V5.75zm5 2.5a.75.75 0 001.5 0V3.664l1.62 1.62a.75.75 0 001.06-1.06l-3-3a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.62-1.62V8.25z" />
        <path d="M10.25 18.25a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" />
    </svg>
);

export default ProceduralIcon;
