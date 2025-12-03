import { useToast } from '../context/ToastContext';

export const useErrorHandler = () => {
  const { showToast } = useToast();

  const getErrorMessage = (error: any): string => {
    // Firebase Auth Errors
    if (error?.code) {
      switch (error.code) {
        case 'auth/invalid-credential':
          return 'Email ou mot de passe incorrect';
        case 'auth/user-not-found':
          return 'Utilisateur non trouvé';
        case 'auth/wrong-password':
          return 'Mot de passe incorrect';
        case 'auth/email-already-in-use':
          return 'Cet email est déjà utilisé';
        case 'auth/weak-password':
          return 'Le mot de passe est trop faible';
        case 'auth/too-many-requests':
          return 'Trop de tentatives. Veuillez réessayer plus tard';
        case 'permission-denied':
          return 'Vous n\'avez pas la permission d\'effectuer cette action';
        case 'unavailable':
          return 'Service temporairement indisponible';
        default:
          return error.message || 'Une erreur Firebase est survenue';
      }
    }

    // Standard JavaScript Error
    if (error instanceof Error) {
      return error.message;
    }

    // String error
    if (typeof error === 'string') {
      return error;
    }

    // Unknown error
    return 'Une erreur inattendue s\'est produite';
  };

  const handleError = (error: any, customMessage?: string) => {
    console.error('Error caught:', error);
    const errorMessage = customMessage || getErrorMessage(error);
    showToast('error', errorMessage);
  };

  const handleSuccess = (message: string) => {
    showToast('success', message);
  };

  const handleWarning = (message: string) => {
    showToast('warning', message);
  };

  const handleInfo = (message: string) => {
    showToast('info', message);
  };

  return {
    getErrorMessage,
    handleError,
    handleSuccess,
    handleWarning,
    handleInfo,
  };
};
