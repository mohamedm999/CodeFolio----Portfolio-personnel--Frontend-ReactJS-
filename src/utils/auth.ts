import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  exp: number;
  iat: number;
  userId?: string;
  username?: string;
}

/**
 * Check if a JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

/**
 * Get a valid access token (refresh if needed)
 */
export const getValidToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken || isTokenExpired(accessToken)) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken || isTokenExpired(refreshToken)) {
      return null;
    }
    
    // Token refresh will be handled by useTokenRefresh hook
    return null;
  }
  
  return accessToken;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('accessToken');
  return token !== null && !isTokenExpired(token);
};

/**
 * Clear all authentication data
 */
export const clearAuthData = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

/**
 * Store authentication tokens
 */
export const storeAuthTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};
