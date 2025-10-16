
import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { login, register } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (mode === 'login') {
        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }
        const loggedIn = login(username, password);
        if (loggedIn) {
            setSuccess("Login successful!");
            setTimeout(() => {
                onClose();
                resetForm();
            }, 1000);
        } else {
            setError("Invalid credentials.");
        }
      } else {
        if (!username || !email || !password) {
            setError("All fields are required for registration.");
            return;
        }
        const registered = register(username, email, password);
        if (registered) {
            setSuccess("Registration successful! Please log in.");
            setMode('login');
        } else {
            setError("Username or email already exists.");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError(null);
    setSuccess(null);
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-gray-800 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20 w-full max-w-md m-4 p-8 relative transform transition-all duration-300 scale-95 animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
        <div className="flex mb-6 border-b border-gray-700">
          <button onClick={() => switchMode('login')} className={`flex-1 py-2 text-lg font-semibold transition-colors ${mode === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Login</button>
          <button onClick={() => switchMode('register')} className={`flex-1 py-2 text-lg font-semibold transition-colors ${mode === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Register</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          {mode === 'register' && (
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          )}
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          
          <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:scale-105">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
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

export default AuthModal;
