import React from 'react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  certificateType: 'Procedural' | 'OOP' | 'Puzzles';
}

const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, userName, certificateType }) => {
  if (!isOpen) return null;

  const fullTitle = {
    'Procedural': 'Procedural Programming',
    'OOP': 'Object-Oriented Programming',
    'Puzzles': 'Coding Puzzles'
  }[certificateType];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-gray-900 border-4 border-yellow-400 rounded-lg shadow-2xl shadow-yellow-400/30 w-full max-w-3xl m-4 p-8 relative transform transition-all duration-300 scale-95 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
        
        <div className="text-center space-y-4 text-white">
          <h1 className="text-4xl font-bold text-yellow-300" style={{ fontFamily: 'serif' }}>Certificate of Achievement</h1>
          <p className="text-lg text-gray-300">This certificate is proudly presented to</p>
          <p className="text-5xl font-bold text-gradient font-fira-code">{userName}</p>
          <p className="text-lg text-gray-300">for successfully completing the</p>
          <p className="text-3xl font-semibold text-yellow-400">{fullTitle}</p>
          <p className="text-lg text-gray-300">module on CodeQuest.</p>
          
          <div className="pt-8 flex justify-between items-end">
            <div className="text-left">
                <p className="text-md text-gray-400">Issued by</p>
                <p className="text-xl font-bold text-indigo-400 font-fira-code">&lt;CodeQuest /&gt;</p>
            </div>
            <div className="text-right">
                <p className="text-md text-gray-400">Developers</p>
                <p className="text-xl font-bold text-gray-200">ARYA and RIYA</p>
            </div>
          </div>
        </div>
      </div>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default CertificateModal;
