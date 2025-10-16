import React from 'react';

interface IconProps {
  className?: string;
}

const CertificateIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.41,8.29l-4.5-4.5A2,2,0,0,0,15.5,3H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V9.69A2,2,0,0,0,21.41,8.29ZM15,5.41,18.59,9H15ZM10,18a4,4,0,1,1,4-4A4,4,0,0,1,10,18Zm1-6.41,1.71,1.71-1.2,1.2L10,13.41,8.5,14.91,7.29,13.7Z" />
    </svg>
);

export default CertificateIcon;
