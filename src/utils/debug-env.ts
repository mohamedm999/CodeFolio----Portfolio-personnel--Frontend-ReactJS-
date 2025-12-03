export const debugEnv = () => {
  console.log('Firebase Config Debug:');
  console.log('API Key:', import.meta.env.VITE_FIREBASE_API_KEY ? 'Loaded (starts with ' + import.meta.env.VITE_FIREBASE_API_KEY.substring(0, 4) + ')' : 'MISSING');
  console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
  console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
};
