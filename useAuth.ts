import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';

const USERS_KEY = 'codequest_users_v2';
const CURRENT_USER_KEY = 'codequest_current_user_v2';

// Helper to get today's date in YYYY-MM-DD format
const getToday = () => new Date().toISOString().split('T')[0];

const isYesterday = (dateString: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateString === yesterday.toISOString().split('T')[0];
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existingUsers = localStorage.getItem(USERS_KEY);
    if (!existingUsers) {
      localStorage.setItem(USERS_KEY, JSON.stringify([]));
    }
    
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUsers = (): User[] => {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const register = (username: string, email: string, password: string): boolean => {
    const users = getUsers();
    const userExists = users.some(u => u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase());

    if (userExists) {
      return false;
    }

    const newUser: User = {
      id: Date.now(),
      username,
      email,
      password, // In a real app, hash this!
      xp: 0,
      coins: 0,
      streak: 0,
      lastLoginDate: null,
      completedLessons: [],
      // FIX: Initialize challenge properties for new users to align with the updated User type.
      currentChallengeId: 1,
      completedChallenges: [],
      completedCodingQuizzes: [],
    };

    saveUsers([...users, newUser]);
    return true;
  };

  const login = (username: string, password: string): boolean => {
    const users = getUsers();
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      const today = getToday();
      let updatedStreak = foundUser.streak;

      // Update streak logic
      if (foundUser.lastLoginDate !== today) {
        if(foundUser.lastLoginDate && isYesterday(foundUser.lastLoginDate)){
            updatedStreak++; // Continue streak
        } else {
            updatedStreak = 1; // Reset or start streak
        }
      }
      
      const userToLogin = { ...foundUser, streak: updatedStreak, lastLoginDate: today };
      const { password, ...userToStore } = userToLogin;
      
      // 1. Set the user in the React state to trigger the UI change
      setUser(userToStore);

      // 2. Persist the current user session (without password)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));

      // 3. Update the master user list with the new streak/date info
      const userIndex = users.findIndex(u => u.id === foundUser.id);
      if (userIndex !== -1) {
          users[userIndex] = userToLogin; // This object still has the password
          saveUsers(users);
      }

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const updateUser = useCallback((updatedUser: User) => {
    // Separate password from the user object that is stored in state and session storage
    const { password, ...userToStore } = updatedUser;
    
    setUser(userToStore);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToStore));
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === updatedUser.id);

    if (userIndex !== -1) {
        // When updating the main users array, we need to preserve the password.
        // If the updatedUser object doesn't have a password (e.g., from a quiz update),
        // we retrieve the original one.
        const originalPassword = updatedUser.password || users[userIndex].password;
        users[userIndex] = { ...users[userIndex], ...updatedUser, password: originalPassword };
        saveUsers(users);
    }
  }, []);

  return { user, register, login, logout, updateUser };
};