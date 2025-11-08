import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, LOGOUT_MUTATION, REFRESH_TOKEN_MUTATION } from '../graphql/auth';
import { isAuthenticated, clearAuthData, storeAuthTokens, isTokenExpired } from '../utils/auth';

interface AuthContextType {
  isAuth: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  const [refreshTokenMutation] = useMutation(REFRESH_TOKEN_MUTATION);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await loginMutation({
        variables: { username, password },
      });

      if (data?.login) {
        storeAuthTokens(data.login.accessToken, data.login.refreshToken);
        setIsAuth(true);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutMutation();
      clearAuthData();
      setIsAuth(false);
    } catch (err: any) {
      console.error('Logout error:', err);
      // Clear auth data even if logout fails
      clearAuthData();
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    const token = localStorage.getItem('refreshToken');
    if (!token || isTokenExpired(token)) {
      clearAuthData();
      setIsAuth(false);
      return false;
    }

    try {
      const { data } = await refreshTokenMutation({
        variables: { refreshToken: token },
      });

      if (data?.refreshToken) {
        storeAuthTokens(data.refreshToken.accessToken, data.refreshToken.refreshToken);
        setIsAuth(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Token refresh failed:', err);
      clearAuthData();
      setIsAuth(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, refreshToken, loading, error }}>
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
