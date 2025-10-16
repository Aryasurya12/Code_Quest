// FIX: Added 'Page' type to fix navigation-related type errors.
export type Page = 'home' | 'challenge' | 'profile';

export interface User {
  id: number;
  username: string;
  email: string;
  password?: string; // Should not be stored long-term in a real app
  xp: number;
  coins: number;
  streak: number;
  lastLoginDate: string | null;
  completedLessons: number[];
  // FIX: Added 'currentChallengeId' and 'completedChallenges' to track user progress in challenges.
  currentChallengeId: number;
  completedChallenges: number[];
  completedCodingQuizzes: number[];
}

// FIX: Added 'Challenge' interface to define the shape of challenge objects.
export interface Challenge {
  id: number;
  level: number;
  title: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  xpAward: number;
  coinAward: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  code?: string;
}

export interface Lesson {
  id: number;
  title: string;
  category: 'Procedural Programming' | 'Object-Oriented Programming' | 'GUI Programming';
  theory: string;
  quiz: QuizQuestion[];
  xpAward: number;
  coinAward: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface TestCase {
  input: string; // e.g., '5', '"hello"', '[1, 2, 3]'
  expectedOutput: string;
}

export interface CodingQuiz {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Difficult';
  starterCode: string;
  // A template for how to call the user's function with the test case input
  testHarness: (input: string) => string; 
  testCases: TestCase[];
  hint: string;
  xpAward: number;
  coinAward: number;
}

export interface Tutorial {
  id: number;
  title: string;
  videoId: string; // The YouTube video ID
  category: 'Python Basics for Beginners' | 'Data Structures' | 'Object-Oriented Programming';
}