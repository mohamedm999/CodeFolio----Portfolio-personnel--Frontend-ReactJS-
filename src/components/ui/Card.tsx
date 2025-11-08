import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg shadow-md 
        border border-gray-200 dark:border-gray-700
        ${hoverable ? 'hover:shadow-lg transition-shadow duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>;
};
