
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Page } from '../types';
import { challenges } from '../data/challenges';
import { executePythonCode } from '../services/geminiService';
import Button from '../components/Button';

interface ChallengePageProps {
  navigate: (page: Page) => void;
}

const ChallengePage: React.FC<ChallengePageProps> = ({ navigate }) => {
  const { user, updateUser } = useContext(AuthContext);
  
  const currentChallenge = user ? challenges.find(c => c.id === user.currentChallengeId) : null;
  
  const [code, setCode] = useState(''); // Initial state is empty, useEffect will load code.
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // This effect handles loading the correct code (saved or starter) when the component mounts or the challenge changes.
  useEffect(() => {
    if (!user) {
      navigate('home');
      return;
    }

    if (currentChallenge) {
      const savedCodeKey = `codequest_code_progress_${user.id}_${currentChallenge.id}`;
      const savedCode = localStorage.getItem(savedCodeKey);

      setCode(savedCode ?? currentChallenge.starterCode);

      // Reset UI state for the new challenge
      setOutput('');
      setSuccess(false);
      setError('');
    }
  }, [user, currentChallenge, navigate]);


  // This effect auto-saves the user's code to localStorage with a debounce.
  useEffect(() => {
    if (!user || !currentChallenge) {
      return;
    }

    const savedCodeKey = `codequest_code_progress_${user.id}_${currentChallenge.id}`;

    const handler = setTimeout(() => {
      if (code && code !== currentChallenge.starterCode) {
        localStorage.setItem(savedCodeKey, code);
      } else {
        // Clean up if user clears editor or reverts to the default starter code
        localStorage.removeItem(savedCodeKey);
      }
    }, 500); // Debounce saves to every 500ms

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [code, user, currentChallenge]);


  const handleRunCode = async () => {
    if (!code.trim()) {
      setError('Code cannot be empty.');
      return;
    }
    setIsLoading(true);
    setOutput('');
    setError('');
    setSuccess(false);
    try {
      const result = await executePythonCode(code);
      setOutput(result);
      if (result.trim() === currentChallenge?.expectedOutput.trim()) {
        setSuccess(true);
        if (user && updateUser && currentChallenge && !user.completedChallenges.includes(currentChallenge.id)) {
            const updatedUser = {
                ...user,
                xp: user.xp + currentChallenge.xpAward,
                coins: user.coins + currentChallenge.coinAward,
                completedChallenges: [...user.completedChallenges, currentChallenge.id],
            };
            updateUser(updatedUser);
        }
      } else {
         setError("Incorrect output. Try again!");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred during execution.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextChallenge = () => {
    if(user && updateUser && currentChallenge) {
        // Clear saved code for the completed challenge
        const savedCodeKey = `codequest_code_progress_${user.id}_${currentChallenge.id}`;
        localStorage.removeItem(savedCodeKey);

        const nextChallenge = challenges.find(c => c.id > user.currentChallengeId);
        if (nextChallenge) {
            updateUser({ ...user, currentChallengeId: nextChallenge.id });
        } else {
            // Handle case where all challenges are completed
             setOutput("Congratulations! You've completed all challenges!");
        }
    }
  }

  if (!user || !currentChallenge) {
    return (
      <div className="text-center">
        <p className="text-xl text-gray-300">Please log in to start your quest.</p>
        <Button onClick={() => navigate('home')} className="mt-4">Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-2 text-cyan-400">Level {currentChallenge.level}: {currentChallenge.title}</h2>
        <p className="text-gray-300">{currentChallenge.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Editor */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl shadow-cyan-500/10">
          <div className="bg-gray-800 p-3 flex items-center justify-between rounded-t-lg border-b border-gray-700">
             <div className="flex items-center space-x-2">
                <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                <span className="h-3 w-3 bg-yellow-500 rounded-full"></span>
                <span className="h-3 w-3 bg-green-500 rounded-full"></span>
             </div>
             <span className="text-sm text-gray-400">python_challenge.py</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 bg-transparent text-white p-4 font-fira-code text-base resize-none focus:outline-none"
            placeholder="Write your Python code here..."
          />
        </div>

        {/* Output & Controls */}
        <div>
          <div className="flex space-x-4 mb-4">
            <Button onClick={handleRunCode} disabled={isLoading} variant="secondary">
              {isLoading ? 'Running...' : 'Run Code'}
            </Button>
            {success && <Button onClick={handleNextChallenge}>Next Challenge</Button>}
          </div>

          <div className="bg-black rounded-lg border border-gray-700 p-4 h-96 font-fira-code text-sm overflow-y-auto">
            <p className="text-gray-400 mb-2">&gt; python main.py</p>
            {isLoading && <p className="text-yellow-400 animate-pulse">Executing code...</p>}
            {error && <p className="text-red-500 whitespace-pre-wrap">{error}</p>}
            {success && <p className="text-green-400">Success! Output matches the expected result.</p>}
            {output && <pre className="text-white whitespace-pre-wrap">{output}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
