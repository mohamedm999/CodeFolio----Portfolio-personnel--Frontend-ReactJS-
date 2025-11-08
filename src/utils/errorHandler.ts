/**
 * Handle GraphQL errors with specific error codes
 */
export const handleGraphQLError = (error: any): void => {
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach(({ message, extensions }: any) => {
      console.error(`[GraphQL Error]: ${message}`, extensions);

      switch (extensions?.code) {
        case 'UNAUTHENTICATED':
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          break;
        case 'PROFILE_ALREADY_EXISTS':
          console.warn('Profile already exists, use update instead');
          break;
        case 'INTERNAL_SERVER_ERROR':
          console.error('Server error occurred');
          break;
        default:
          console.error('GraphQL Error:', message);
      }
    });
  }

  if (error.networkError) {
    console.error('[Network Error]:', error.networkError);
  }
};

/**
 * Extract error message from Apollo Error
 */
export const getErrorMessage = (error: any): string => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.graphQLErrors[0].message;
  }
  if (error.networkError) {
    return 'Network error occurred. Please check your connection.';
  }
  return 'An unexpected error occurred.';
};
