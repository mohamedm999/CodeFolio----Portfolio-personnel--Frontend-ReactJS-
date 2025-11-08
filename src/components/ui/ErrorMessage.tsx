import React from 'react';

interface ErrorMessageProps {
  error?: any;
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, message }) => {
  const errorMsg = message || error?.message || 'An error occurred';

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
        <div className="flex items-center space-x-3">
          <svg
            className="w-6 h-6 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-red-800 dark:text-red-400 font-semibold">Error</h3>
            <p className="text-red-700 dark:text-red-300 text-sm mt-1">{errorMsg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InlineError: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 mb-4">
      <p className="text-red-700 dark:text-red-300 text-sm">{message}</p>
    </div>
  );
};
