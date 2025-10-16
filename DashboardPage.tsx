import React, { useState, useContext, FormEvent, useRef, useEffect, useMemo } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { lessons } from '../data/lessons';
import { codingQuizzes } from '../data/codingQuizzes';
import { tutorials } from '../data/tutorials';
import { Lesson, QuizQuestion, ChatMessage, CodingQuiz, TestCase, User, Tutorial } from '../types';
import Button from '../components/Button';
import { getChatbotResponse, executePythonCode } from '../services/geminiService';
import TrophyIcon from '../components/icons/TrophyIcon';
import ProceduralIcon from '../components/icons/ProceduralIcon';
import OopIcon from '../components/icons/OopIcon';
import PuzzleIcon from '../components/icons/PuzzleIcon';
import CertificateModal from '../components/CertificateModal';
import CertificateIcon from '../components/icons/CertificateIcon';


type View = 'LESSON_LIST' | 'LESSON_DETAIL' | 'QUIZ';
type DashboardTab = 'lessons' | 'coding_puzzles' | 'achievements' | 'chatbot' | 'leaderboard' | 'tutorials';
type TestResultStatus = 'pending' | 'running' | 'passed' | 'failed' | 'error';

interface TestResult {
    status: TestResultStatus;
    output?: string;
    error?: string;
}

const DashboardPage: React.FC = () => {
    const { user, logout, updateUser } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState<DashboardTab>('lessons');
    
    // Lesson and Quiz state
    const [view, setView] = useState<View>('LESSON_LIST');
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [quizResult, setQuizResult] = useState<{ score: number; total: number } | null>(null);

    // Chatbot state
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [chatHistoryLoaded, setChatHistoryLoaded] = useState(false);

    // Coding Puzzles state
    const [currentCodingQuiz, setCurrentCodingQuiz] = useState<CodingQuiz | null>(null);
    const [code, setCode] = useState('');
    const [testResults, setTestResults] = useState<TestResult[]>([]);
    const [isTestingCode, setIsTestingCode] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [allTestsPassed, setAllTestsPassed] = useState(false);

    // --- Editor Enhancements State ---
    const [lineNumbers, setLineNumbers] = useState('1');
    const lineNumbersRef = useRef<HTMLTextAreaElement>(null);
    const codeEditorRef = useRef<HTMLTextAreaElement>(null);
    const cursorPositionRef = useRef<number | null>(null);


    // Leaderboard state
    const [leaderboardUsers, setLeaderboardUsers] = useState<User[]>([]);

    // Certificate state
    const [viewingCertificate, setViewingCertificate] = useState<'Procedural' | 'OOP' | 'Puzzles' | null>(null);

    const lessonsByCategory = useMemo(() => {
        return lessons.reduce((acc, lesson) => {
            const cat = lesson.category;
            if (!acc[cat]) {
                acc[cat] = [];
            }
            acc[cat].push(lesson);
            return acc;
        }, {} as Record<string, Lesson[]>);
    }, []);

    const quizzesByDifficulty = useMemo(() => {
        return codingQuizzes.reduce((acc, quiz) => {
            const diff = quiz.difficulty;
            if (!acc[diff]) {
                acc[diff] = [];
            }
            acc[diff].push(quiz);
            return acc;
        }, {} as Record<'Easy' | 'Medium' | 'Difficult', CodingQuiz[]>);
    }, []);

     const tutorialsByCategory = useMemo(() => {
        return tutorials.reduce((acc, tutorial) => {
            const cat = tutorial.category;
            if (!acc[cat]) {
                acc[cat] = [];
            }
            acc[cat].push(tutorial);
            return acc;
        }, {} as Record<string, Tutorial[]>);
    }, []);


    useEffect(() => {
        // Scroll to bottom of chat history when new messages are added
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);
    
    // Load chat history from localStorage
    useEffect(() => {
        if (user) {
            const allHistoriesJson = localStorage.getItem('codequest_chat_histories');
            if (allHistoriesJson) {
                try {
                    const allHistories = JSON.parse(allHistoriesJson);
                    const userHistory = allHistories[user.id];
                    if (userHistory) {
                        setChatHistory(userHistory);
                    } else {
                        setChatHistory([]); // Clear for users with no saved history
                    }
                } catch (e) {
                    console.error("Failed to parse chat history from localStorage", e);
                    setChatHistory([]);
                }
            }
            setChatHistoryLoaded(true);
        }
    }, [user]);

    // Save chat history to localStorage
    useEffect(() => {
        if (user && chatHistoryLoaded) {
            try {
                const allHistoriesJson = localStorage.getItem('codequest_chat_histories');
                const allHistories = allHistoriesJson ? JSON.parse(allHistoriesJson) : {};
                allHistories[user.id] = chatHistory;
                localStorage.setItem('codequest_chat_histories', JSON.stringify(allHistories));
            } catch (e) {
                console.error("Failed to save chat history to localStorage", e);
            }
        }
    }, [chatHistory, user, chatHistoryLoaded]);

    useEffect(() => {
        if (activeTab === 'leaderboard') {
            const usersJson = localStorage.getItem('codequest_users_v2');
            if (usersJson) {
                const allUsers: User[] = JSON.parse(usersJson);
                const sortedUsers = allUsers.sort((a, b) => b.xp - a.xp);
                setLeaderboardUsers(sortedUsers);
            }
        }
    }, [activeTab]);

    // --- Editor Enhancements Effects ---
    useEffect(() => {
        const lineCount = code.split('\n').length;
        const newLineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');
        setLineNumbers(newLineNumbers);
    }, [code]);

    useEffect(() => {
        if (cursorPositionRef.current !== null && codeEditorRef.current) {
            codeEditorRef.current.selectionStart = cursorPositionRef.current;
            codeEditorRef.current.selectionEnd = cursorPositionRef.current;
            cursorPositionRef.current = null;
        }
    }, [code]);

    const handleSelectLesson = (lesson: Lesson) => {
        setCurrentLesson(lesson);
        setView('LESSON_DETAIL');
        setQuizResult(null);
    };

    const startQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setQuizResult(null);
        setView('QUIZ');
    }

    const handleAnswerSubmit = (answerIndex: number) => {
        const updatedAnswers = [...userAnswers, answerIndex];
        setUserAnswers(updatedAnswers);

        if (currentQuestionIndex < (currentLesson?.quiz.length ?? 0) - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Quiz finished
            finishQuiz(updatedAnswers);
        }
    };

    const finishQuiz = (finalAnswers: number[]) => {
        if (!currentLesson || !user) return;

        let score = 0;
        currentLesson.quiz.forEach((q, index) => {
            if (q.correctAnswerIndex === finalAnswers[index]) {
                score++;
            }
        });
        
        const total = currentLesson.quiz.length;
        setQuizResult({ score, total });

        // Pass if score is > 50%
        if (score / total > 0.5 && !user.completedLessons.includes(currentLesson.id)) {
            const updatedUser = {
                ...user,
                xp: user.xp + currentLesson.xpAward,
                coins: user.coins + currentLesson.coinAward,
                completedLessons: [...user.completedLessons, currentLesson.id],
            };
            updateUser(updatedUser);
        }
        setView('LESSON_DETAIL');
    };

    const resetToLessonList = () => {
        setView('LESSON_LIST');
        setCurrentLesson(null);
        setQuizResult(null);
    }

    const handleChatSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim() || isBotTyping) return;

        const userMessage: ChatMessage = { sender: 'user', text: chatInput };
        setChatHistory(prev => [...prev, userMessage]);
        setChatInput('');
        setIsBotTyping(true);

        try {
            const botResponse = await getChatbotResponse(chatInput);
            const botMessage: ChatMessage = { sender: 'bot', text: botResponse };
            setChatHistory(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsBotTyping(false);
        }
    };

    const handleSelectCodingQuiz = (quiz: CodingQuiz) => {
        setCurrentCodingQuiz(quiz);
        setCode(quiz.starterCode);
        setTestResults([]);
        setShowHint(false);
        setAllTestsPassed(false);
    };

    const handleRunTests = async () => {
        if (!currentCodingQuiz) return;
        setIsTestingCode(true);
        setAllTestsPassed(false);

        const initialResults: TestResult[] = currentCodingQuiz.testCases.map(() => ({ status: 'pending' }));
        setTestResults(initialResults);

        let allPassed = true;

        for (let i = 0; i < currentCodingQuiz.testCases.length; i++) {
            const testCase = currentCodingQuiz.testCases[i];
            
            // Update status to 'running'
            setTestResults(prev => prev.map((r, index) => index === i ? { ...r, status: 'running' } : r));

            const fullCode = `${code}\n${currentCodingQuiz.testHarness(testCase.input)}`;
            
            try {
                const output = await executePythonCode(fullCode);
                const isPythonError = /\b(Error|Exception):/.test(output) || output.trim().startsWith('Traceback');
                
                if (isPythonError) {
                    allPassed = false;
                    setTestResults(prev => prev.map((r, index) => index === i ? { status: 'error', error: output.trim() } : r));
                } else {
                    const passed = output.trim() === testCase.expectedOutput.trim();
                    if (!passed) allPassed = false;
                    setTestResults(prev => prev.map((r, index) => index === i ? { status: passed ? 'passed' : 'failed', output: output.trim() } : r));
                }
            } catch (e) {
                allPassed = false;
                setTestResults(prev => prev.map((r, index) => index === i ? { status: 'error', error: e instanceof Error ? `API Error: ${e.message}` : 'Unknown API error' } : r));
            }
        }
        
        if (allPassed && user && updateUser && !user.completedCodingQuizzes.includes(currentCodingQuiz.id)) {
            const updatedUser = {
                ...user,
                xp: user.xp + currentCodingQuiz.xpAward,
                coins: user.coins + currentCodingQuiz.coinAward,
                completedCodingQuizzes: [...user.completedCodingQuizzes, currentCodingQuiz.id],
            };
            updateUser(updatedUser);
            setAllTestsPassed(true);
        }

        setIsTestingCode(false);
    };

    const handleCodeKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const editor = e.currentTarget;
        const { value, selectionStart, selectionEnd } = editor;

        if (e.key === 'Enter') {
            e.preventDefault();
            const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
            const currentLine = value.substring(lineStart, selectionStart);
            const indentMatch = currentLine.match(/^\s*/);
            let indent = indentMatch ? indentMatch[0] : '';
            if (currentLine.trim().endsWith(':')) {
                indent += '  ';
            }
            const newText = '\n' + indent;
            const newValue = value.substring(0, selectionStart) + newText + value.substring(selectionEnd);
            setCode(newValue);
            cursorPositionRef.current = selectionStart + newText.length;
        }

        if (e.key === 'Tab') {
            e.preventDefault();
            const newText = '  ';
            const newValue = value.substring(0, selectionStart) + newText + value.substring(selectionEnd);
            setCode(newValue);
            cursorPositionRef.current = selectionStart + newText.length;
        }
    };

    const syncScroll = () => {
        if (lineNumbersRef.current && codeEditorRef.current) {
            lineNumbersRef.current.scrollTop = codeEditorRef.current.scrollTop;
            lineNumbersRef.current.scrollLeft = codeEditorRef.current.scrollLeft;
        }
    };

    
    // --- RENDER FUNCTIONS ---
    
    const renderHeader = () => (
         <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-indigo-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-3xl font-bold text-indigo-400 font-fira-code tracking-wider">
                        &lt;CodeQuest /&gt;
                    </h1>
                    <div className="flex items-center space-x-6">
                         {user && (
                            <>
                            <span className="font-semibold text-purple-400">💰 {user.coins}</span>
                            <span className="font-semibold text-blue-400">🏆 {user.xp} XP</span>
                            <span className="font-semibold text-violet-400">🔥 {user.streak} Day Streak</span>
                            </>
                         )}
                        <button onClick={logout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Logout</button>
                    </div>
                </div>
                 <div className="flex border-b border-gray-700 overflow-x-auto">
                    <button onClick={() => setActiveTab('lessons')} className={`flex-shrink-0 px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'lessons' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Lessons</button>
                    <button onClick={() => setActiveTab('coding_puzzles')} className={`flex-shrink-0 px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'coding_puzzles' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Coding Puzzles</button>
                    <button onClick={() => setActiveTab('tutorials')} className={`flex-shrink-0 px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'tutorials' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Tutorials</button>
                    <button onClick={() => setActiveTab('achievements')} className={`flex-shrink-0 px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'achievements' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Achievements</button>
                    <button onClick={() => setActiveTab('leaderboard')} className={`flex-shrink-0 px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'leaderboard' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Leaderboard</button>
                    <button onClick={() => setActiveTab('chatbot')} className={`flex-shrink-0 px-4 py-2 text-lg font-semibold transition-colors ${activeTab === 'chatbot' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400'}`}>Chatbot</button>
                </div>
            </div>
        </header>
    );

    const renderLessonList = () => {
        const lessonCard = (lesson: Lesson, index: number, categoryLessons: Lesson[]) => {
            const isCompleted = user?.completedLessons.includes(lesson.id);
            // The first lesson is always unlocked.
            // Subsequent lessons are unlocked if the previous one is completed.
            const previousLesson = categoryLessons[index - 1];
            const isLocked = index > 0 && previousLesson && !user?.completedLessons.includes(previousLesson.id);

            const cardClasses = isLocked
                ? "bg-gray-800/30 border-gray-700/50 rounded-lg p-4 cursor-not-allowed opacity-60 flex justify-between items-center"
                : "bg-gray-800/50 border border-gray-700 rounded-lg p-4 cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg hover:shadow-violet-500/20 flex justify-between items-center";
            
            const handleClick = () => {
                if (!isLocked) {
                    handleSelectLesson(lesson);
                }
            };

            return (
                <div key={lesson.id} onClick={handleClick} className={cardClasses} aria-disabled={isLocked}>
                    <div>
                        <h3 className={`text-lg font-bold ${isLocked ? 'text-gray-500' : 'text-purple-300'}`}>{lesson.title}</h3>
                        <p className={`text-sm ${isLocked ? 'text-gray-600' : 'text-gray-400'}`}>+ {lesson.xpAward} XP / + {lesson.coinAward} Coins</p>
                    </div>
                    {isLocked
                        ? <span className="text-2xl" role="img" aria-label="locked">🔒</span>
                        : isCompleted && <span className="text-green-400 font-bold">✓</span>
                    }
                </div>
            );
        };

        return (
             <div className="space-y-8">
                {Object.entries(lessonsByCategory).map(([category, lessonsInCategory]) => (
                    <div key={category}>
                        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b-2 border-indigo-500/30 pb-2">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lessonsInCategory.map((lesson, index) => lessonCard(lesson, index, lessonsInCategory))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    
    const renderLessonDetail = () => {
        if (!currentLesson) return null;
        const isCompleted = user?.completedLessons.includes(currentLesson.id);
        return (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 animate-fade-in">
                 <button onClick={resetToLessonList} className="text-indigo-400 mb-4">&larr; Back to Lessons</button>
                 <h2 className="text-3xl font-bold mb-4 text-indigo-400">{currentLesson.title}</h2>
                 <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap mb-6" dangerouslySetInnerHTML={{ __html: currentLesson.theory.replace(/```python\n([\s\S]*?)```/g, '<pre class="bg-gray-900 rounded-md p-4 font-fira-code text-sm"><code>$1</code></pre>') }}></div>
                
                 {quizResult && (
                    <div className={`p-4 rounded-md mb-4 ${quizResult.score / quizResult.total > 0.5 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        <h3 className="font-bold">Quiz Result: You scored {quizResult.score} out of {quizResult.total}</h3>
                        {quizResult.score / quizResult.total <= 0.5 && <p>You didn't pass this time. Review the theory and try again!</p>}
                    </div>
                 )}
                 
                 <Button onClick={startQuiz} variant="secondary">{isCompleted ? 'Retake Quiz' : 'Start Quiz'}</Button>
            </div>
        );
    };

    const renderQuiz = () => {
        if (!currentLesson) return null;
        const question: QuizQuestion = currentLesson.quiz[currentQuestionIndex];
        return (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-indigo-400">{currentLesson.title} Quiz</h2>
                    <p className="text-gray-400">Question {currentQuestionIndex + 1} of {currentLesson.quiz.length}</p>
                </div>
                <p className="text-lg text-gray-300 mb-4">{question.question}</p>
                 {question.code && (
                    <pre className="bg-gray-900 rounded-md p-4 font-fira-code text-sm mb-4">{question.code}</pre>
                 )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswerSubmit(index)} className="w-full text-left p-4 bg-gray-700 rounded-md hover:bg-indigo-600 transition-colors">
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderCodingQuizList = () => {
        const difficultyTitles: Record<string, string> = {
            'Easy': 'Easy - Level',
            'Medium': 'Mid - Level',
            'Difficult': 'Difficult - Level',
        };

        const quizCard = (quiz: CodingQuiz) => (
            <div key={quiz.id} onClick={() => handleSelectCodingQuiz(quiz)} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg hover:shadow-violet-500/20 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-purple-300">{quiz.title}</h3>
                    <p className="text-sm text-gray-400">+ {quiz.xpAward} XP / + {quiz.coinAward} Coins</p>
                </div>
                {user?.completedCodingQuizzes.includes(quiz.id) && <span className="text-green-400 font-bold">✓</span>}
            </div>
        );

        return (
            <div className="space-y-8">
                {(['Easy', 'Medium', 'Difficult'] as const).map(difficulty => (
                    quizzesByDifficulty[difficulty] && (
                        <div key={difficulty}>
                            <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b-2 border-indigo-500/30 pb-2">
                                {difficultyTitles[difficulty]}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {quizzesByDifficulty[difficulty].map(quiz => quizCard(quiz))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        );
    };

    const renderCodingQuizDetail = () => {
        if (!currentCodingQuiz) return null;

        const getStatusIcon = (status: TestResultStatus) => {
            switch (status) {
                case 'pending': return <span className="text-gray-400">...</span>;
                case 'running': return <span className="text-yellow-400 animate-spin">●</span>;
                case 'passed': return <span className="text-green-400">✓</span>;
                case 'failed': return <span className="text-red-400">✗</span>;
                case 'error': return <span className="text-red-500">!</span>;
            }
        };

        return (
            <div className="animate-fade-in">
                <button onClick={() => setCurrentCodingQuiz(null)} className="text-indigo-400 mb-4">&larr; Back to Puzzles</button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side: Description & Editor */}
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-2 text-indigo-400">{currentCodingQuiz.title}</h2>
                            <p className="text-gray-300">{currentCodingQuiz.description}</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl shadow-indigo-500/10 font-fira-code text-base">
                            <div className="bg-gray-800 p-3 flex items-center justify-between rounded-t-lg border-b border-gray-700">
                                <span className="text-sm text-gray-400">your_solution.py</span>
                            </div>
                            <div className="flex h-80">
                                <textarea
                                    ref={lineNumbersRef}
                                    value={lineNumbers}
                                    readOnly
                                    className="w-12 text-right p-4 bg-gray-800/50 text-gray-500 resize-none focus:outline-none border-r border-gray-700 overflow-hidden"
                                    spellCheck="false"
                                />
                                <textarea
                                    ref={codeEditorRef}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    onKeyDown={handleCodeKeyDown}
                                    onScroll={syncScroll}
                                    className="flex-1 bg-transparent text-white p-4 resize-none focus:outline-none"
                                    placeholder="Write your Python code here..."
                                    spellCheck="false"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Right side: Controls & Output */}
                    <div>
                        <div className="flex space-x-4 mb-4">
                            <Button onClick={handleRunTests} disabled={isTestingCode} variant="secondary">
                                {isTestingCode ? 'Running Tests...' : 'Run Tests'}
                            </Button>
                            <Button onClick={() => setShowHint(true)} variant="primary" className="bg-gray-600 hover:bg-gray-500">Get a Hint</Button>
                        </div>
                         {showHint && (
                            <div className="bg-yellow-500/20 text-yellow-300 p-3 rounded-md mb-4 border border-yellow-500/30">
                                <strong>Hint:</strong> {currentCodingQuiz.hint}
                            </div>
                        )}
                        {allTestsPassed && (
                            <div className="bg-green-500/20 text-green-300 p-3 rounded-md mb-4 border border-green-500/30">
                                <strong>Success!</strong> All tests passed. You've earned {currentCodingQuiz.xpAward} XP and {currentCodingQuiz.coinAward} coins!
                            </div>
                        )}
                        <div className="bg-black rounded-lg border border-gray-700 p-4 h-96 font-fira-code text-sm overflow-y-auto">
                           {testResults.length === 0 && <p className="text-gray-500">Test results will appear here...</p>}
                           {testResults.map((result, index) => {
                               const testCase = currentCodingQuiz.testCases[index];
                               return (
                                   <div key={index} className="mb-2 pb-2 border-b border-gray-700/50 last:border-b-0">
                                       <p>Test Case {index + 1}: {getStatusIcon(result.status)}</p>
                                       {result.status === 'failed' && (
                                           <>
                                            <p className="text-gray-400">Input: <code className="text-cyan-400">{testCase.input}</code></p>
                                            <p className="text-gray-400">Expected: <code className="text-green-400">{testCase.expectedOutput}</code></p>
                                            <p className="text-gray-400">Got: <code className="text-red-400">{result.output}</code></p>
                                           </>
                                       )}
                                        {result.status === 'error' && (
                                            <p className="text-red-500 whitespace-pre-wrap">Error: {result.error}</p>
                                       )}
                                   </div>
                               )
                           })}
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const renderAchievements = () => {
        if (!user) return null;
        const proceduralLessons = lessons.filter(l => l.category === 'Procedural Programming');
        const oopLessons = lessons.filter(l => l.category === 'Object-Oriented Programming');

        const proceduralCompleted = proceduralLessons.filter(l => user.completedLessons.includes(l.id)).length;
        const oopCompleted = oopLessons.filter(l => user.completedLessons.includes(l.id)).length;
        const completedCodingQuizzes = user.completedCodingQuizzes.length;
        const totalCodingQuizzes = codingQuizzes.length;

        const isProceduralComplete = proceduralCompleted > 0 && proceduralCompleted === proceduralLessons.length;
        const isOopComplete = oopCompleted > 0 && oopCompleted === oopLessons.length;
        const arePuzzlesComplete = completedCodingQuizzes > 0 && completedCodingQuizzes === totalCodingQuizzes;

        const BadgeCard = ({ title, completed, total, icon }: { title: string, completed: number, total: number, icon: React.ReactNode }) => {
            const percentage = total > 0 ? (completed / total) * 100 : 0;
            let tier: 'locked' | 'bronze' | 'silver' | 'gold' = 'locked';
            let color = 'text-gray-600';
            let shadowColor = 'shadow-gray-900/20';
            let progressColor = 'bg-gray-500';

            if (percentage >= 100) {
                tier = 'gold';
                color = 'text-yellow-400';
                shadowColor = 'shadow-yellow-400/30';
                progressColor = 'bg-gradient-to-r from-yellow-400 to-amber-500';
            } else if (percentage >= 50) {
                tier = 'silver';
                color = 'text-slate-300';
                shadowColor = 'shadow-slate-300/30';
                progressColor = 'bg-gradient-to-r from-slate-300 to-gray-400';
            } else if (percentage > 0) {
                tier = 'bronze';
                color = 'text-amber-600';
                shadowColor = 'shadow-amber-600/30';
                progressColor = 'bg-gradient-to-r from-amber-600 to-orange-700';
            }

            const tierText = {
                locked: 'Not Started',
                bronze: 'In Progress',
                silver: 'Halfway There!',
                gold: 'Mastered!'
            };

            const itemType = title === 'Coding Puzzles' ? 'Puzzles' : 'Lessons';

            return (
                <div className={`bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl ${shadowColor}`}>
                    <div className={color}>
                        {icon}
                    </div>
                    <h4 className="text-xl font-bold text-purple-300">{title}</h4>
                    <p className={`font-semibold ${color} mb-2 text-lg`}>{tierText[tier]}</p>
                    <p className="text-gray-400 mb-4">{completed} / {total} {itemType} Completed</p>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className={`${progressColor} h-2.5 rounded-full shadow-lg`} style={{ width: `${percentage}%` }}></div>
                    </div>
                </div>
            );
        };

        const CertificateCard = ({ title, isUnlocked, onClick }: { title: string, isUnlocked: boolean, onClick: () => void }) => {
            const cardClasses = isUnlocked
                ? "bg-gray-800/50 border border-yellow-500/50 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl hover:shadow-yellow-400/30"
                : "bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 flex flex-col items-center text-center opacity-60 cursor-not-allowed";

            return (
                <div onClick={onClick} className={cardClasses} aria-disabled={!isUnlocked}>
                    <CertificateIcon className={`h-24 w-24 mb-4 ${isUnlocked ? 'text-yellow-400' : 'text-gray-600'}`} />
                    <h4 className="text-xl font-bold text-purple-300">{title}</h4>
                    {isUnlocked
                        ? <p className="font-semibold text-yellow-300 mt-2 text-lg">View Certificate</p>
                        : <p className="font-semibold text-gray-500 mt-2 text-lg">Locked 🔒</p>
                    }
                </div>
            );
        };


        return (
            <div className="space-y-12 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-gray-700/50 p-6 rounded-lg shadow-lg">
                        <p className="text-5xl mb-2">🏆</p>
                        <p className="text-3xl font-bold text-blue-400">{user.xp}</p>
                        <p className="text-gray-400">Total XP</p>
                    </div>
                     <div className="bg-gray-700/50 p-6 rounded-lg shadow-lg">
                        <p className="text-5xl mb-2">💰</p>
                        <p className="text-3xl font-bold text-purple-400">{user.coins}</p>
                        <p className="text-gray-400">Coins Earned</p>
                    </div>
                     <div className="bg-gray-700/50 p-6 rounded-lg shadow-lg">
                        <p className="text-5xl mb-2">🔥</p>
                        <p className="text-3xl font-bold text-violet-400">{user.streak}</p>
                        <p className="text-gray-400">Day Streak</p>
                    </div>
                </div>
                <div>
                     <h3 className="text-2xl font-bold mb-6 text-indigo-400 text-center border-b border-indigo-500/20 pb-2">My Achievements</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <BadgeCard 
                            title="Procedural Programming" 
                            completed={proceduralCompleted} 
                            total={proceduralLessons.length}
                            icon={<ProceduralIcon className="h-24 w-24 mb-4" />}
                        />
                        <BadgeCard 
                            title="Object-Oriented Programming" 
                            completed={oopCompleted} 
                            total={oopLessons.length} 
                            icon={<OopIcon className="h-24 w-24 mb-4" />}
                        />
                        <BadgeCard 
                            title="Coding Puzzles" 
                            completed={completedCodingQuizzes} 
                            total={totalCodingQuizzes}
                            icon={<PuzzleIcon className="h-24 w-24 mb-4" />}
                        />
                     </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-6 text-indigo-400 text-center border-b border-indigo-500/20 pb-2">Completion Certificates</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        <CertificateCard
                            title="Procedural Programming"
                            isUnlocked={isProceduralComplete}
                            onClick={() => isProceduralComplete && setViewingCertificate('Procedural')}
                        />
                        <CertificateCard
                            title="Object-Oriented Programming"
                            isUnlocked={isOopComplete}
                            onClick={() => isOopComplete && setViewingCertificate('OOP')}
                        />
                        <CertificateCard
                            title="Coding Puzzles"
                            isUnlocked={arePuzzlesComplete}
                            onClick={() => arePuzzlesComplete && setViewingCertificate('Puzzles')}
                        />
                     </div>
                </div>
            </div>
        );
    };

    const renderLeaderboard = () => {
        if (!user) return null;
    
        const rankIcon = (rank: number) => {
            if (rank === 1) return <TrophyIcon className="h-6 w-6 text-yellow-400" />;
            if (rank === 2) return <TrophyIcon className="h-6 w-6 text-slate-300" />;
            if (rank === 3) return <TrophyIcon className="h-6 w-6 text-amber-600" />;
            return <span className="text-gray-400 font-bold w-6 text-center">{rank}</span>;
        };
        
        return (
            <div className="max-w-4xl mx-auto animate-fade-in">
                <h2 className="text-3xl font-bold mb-6 text-indigo-400 text-center">Top Questers</h2>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-xl shadow-indigo-500/10">
                    <div className="flex p-4 border-b border-gray-700 font-bold text-gray-300">
                        <div className="w-1/6 text-center">Rank</div>
                        <div className="w-3/6">Player</div>
                        <div className="w-2/6 text-right">XP</div>
                    </div>
                    <div className="space-y-1 p-2">
                        {leaderboardUsers.map((player, index) => {
                            const rank = index + 1;
                            const isCurrentUser = player.id === user.id;
                            return (
                                <div key={player.id} className={`flex items-center p-3 rounded-md transition-colors ${isCurrentUser ? 'bg-indigo-900/50 border border-indigo-500' : 'hover:bg-gray-700/50'}`}>
                                    <div className="w-1/6 flex justify-center items-center">{rankIcon(rank)}</div>
                                    <div className="w-3/6 font-semibold text-white">{player.username}</div>
                                    <div className="w-2/6 text-right font-fira-code text-blue-400">{player.xp} XP</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderChatbot = () => (
        <div className="h-[calc(100vh-10rem)] flex flex-col bg-gray-800/50 border border-gray-700 rounded-lg">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-indigo-400">CodeBot Tutor</h2>
                <p className="text-sm text-gray-400">Ask me anything about Python!</p>
            </div>
            <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl lg:max-w-2xl px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/```python\n([\s\S]*?)```/g, '<pre class="bg-gray-900 rounded-md p-3 font-fira-code text-sm"><code>$1</code></pre>') }}></div>
                        </div>
                    </div>
                ))}
                 {isBotTyping && (
                    <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300">
                            <span className="animate-pulse">CodeBot is typing...</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 border-t border-gray-700">
                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="e.g., Explain what a list comprehension is..."
                        className="w-full p-3 bg-gray-700/50 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={isBotTyping}
                    />
                    <Button type="submit" variant="secondary" disabled={isBotTyping || !chatInput.trim()}>
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );

     const renderTutorials = () => (
        <div className="space-y-12 animate-fade-in">
            {Object.entries(tutorialsByCategory).map(([category, tutorialsInCategory]) => (
                <div key={category}>
                    <h2 className="text-2xl font-bold mb-6 text-indigo-400 border-b-2 border-indigo-500/30 pb-2">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tutorialsInCategory.map(tutorial => (
                            <div key={tutorial.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 shadow-lg transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl hover:shadow-violet-500/20">
                                <h3 className="text-lg font-bold text-purple-300 mb-3">{tutorial.title}</h3>
                                <div className="aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                                        title={tutorial.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );


    const renderContent = () => {
        if(activeTab === 'achievements') return renderAchievements();
        if(activeTab === 'chatbot') return renderChatbot();
        if(activeTab === 'leaderboard') return renderLeaderboard();
        if(activeTab === 'tutorials') return renderTutorials();
        if(activeTab === 'coding_puzzles') {
            return currentCodingQuiz ? renderCodingQuizDetail() : renderCodingQuizList();
        }
        
        // Default to 'lessons' tab
        switch (view) {
            case 'LESSON_DETAIL': return renderLessonDetail();
            case 'QUIZ': return renderQuiz();
            case 'LESSON_LIST':
            default:
                return renderLessonList();
        }
    }

    return (
        <>
            {renderHeader()}
            <main className="flex-grow container mx-auto px-4 py-8">
                {renderContent()}
            </main>
            {viewingCertificate && user && (
                <CertificateModal
                    isOpen={!!viewingCertificate}
                    onClose={() => setViewingCertificate(null)}
                    userName={user.username}
                    certificateType={viewingCertificate}
                />
            )}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-spin {
                    display: inline-block;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .text-orange-400 { color: #fb923c; }
                /* Hide scrollbar for webkit browsers */
                .font-fira-code textarea::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for Firefox */
                .font-fira-code textarea {
                    scrollbar-width: none;
                }
                /* For aspect ratio plugin */
                .aspect-w-16 { position: relative; padding-bottom: 56.25%; }
                .aspect-h-9 { position: relative; padding-bottom: 0; height: 100%; }
                .aspect-w-16 > iframe, .aspect-h-9 > iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </>
    );
};

export default DashboardPage;