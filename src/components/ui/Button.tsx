import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2';

  const variantClasses = {
    primary: 'text-white shadow-lg hover:shadow-xl',
    secondary: 'text-white hover:opacity-90',
    danger: 'text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 hover:text-white',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/10',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #A855F7, #EC4899)',
      boxShadow: '0 10px 30px rgba(168, 85, 247, 0.3)'
    },
    secondary: {
      background: 'rgba(168, 85, 247, 0.2)',
      border: '1px solid rgba(168, 85, 247, 0.3)'
    },
    danger: {
      background: 'linear-gradient(135deg, #EF4444, #DC2626)',
      boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
    },
    outline: {
      background: 'transparent',
      border: '2px solid rgba(168, 85, 247, 0.5)',
      color: '#A855F7'
    },
    ghost: {
      background: 'transparent'
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${(disabled || loading) ? disabledClasses : ''}
        ${className}
      `}
      style={variantStyles[variant]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : icon}
      {children}
    </motion.button>
  );
};
