import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  error?: any;
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, message, onRetry }) => {
  const errorMsg = message || error?.message || 'An error occurred';

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-[#030014]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-xl rounded-2xl p-8 max-w-md border"
        style={{
          background: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.3)'
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-red-500/20 mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-red-400 font-bold text-xl mb-2">Oops! Something went wrong</h3>
          <p className="text-red-300/80 text-sm mb-6">{errorMsg}</p>
          {onRetry && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all"
              style={{
                background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export const InlineError: React.FC<{ message: string }> = ({ message }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl p-4 mb-4 border flex items-center gap-3"
      style={{
        background: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)'
      }}
    >
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      <p className="text-red-300 text-sm">{message}</p>
    </motion.div>
  );
};
