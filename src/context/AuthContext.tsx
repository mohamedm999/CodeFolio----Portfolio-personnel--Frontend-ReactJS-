import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { loginUser, logoutUser, subscribeToAuthChanges } from '../services/firebase/auth.service';

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setIsAuth(!!currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await loginUser(email, password);
      // State updates handled by onAuthStateChanged
    } catch (err: any) {
      console.error('Login failed:', err);
      let errorMessage = 'Login failed';

      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'User not found';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      // State updates handled by onAuthStateChanged
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
