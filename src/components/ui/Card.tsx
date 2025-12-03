import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  gradient?: boolean;
  glow?: 'purple' | 'pink' | 'cyan' | 'none';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hoverable = false,
  gradient = false,
  glow = 'none'
}) => {
  const glowColors = {
    purple: 'hover:shadow-purple-500/20',
    pink: 'hover:shadow-pink-500/20',
    cyan: 'hover:shadow-cyan-500/20',
    none: ''
  };

  return (
    <motion.div
      whileHover={hoverable ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`
        backdrop-blur-xl rounded-2xl 
        border border-purple-500/20
        ${hoverable ? `hover:border-purple-500/40 hover:shadow-2xl ${glowColors[glow]} transition-all duration-300` : ''}
        ${gradient ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : ''}
        ${className}
      `}
      style={{
        background: gradient ? undefined : 'rgba(10, 9, 26, 0.8)',
      }}
    >
      {children}
    </motion.div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action, icon }) => {
  return (
    <div className="px-6 py-4 border-b border-purple-500/20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`px-6 py-4 border-t border-purple-500/20 ${className}`}>{children}</div>;
};

// New: Stat Card for Dashboard
interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'purple' | 'pink' | 'cyan' | 'green';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'purple' }) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    cyan: 'from-cyan-500 to-cyan-600',
    green: 'from-green-500 to-green-600'
  };

  const glowClasses = {
    purple: 'shadow-purple-500/20',
    pink: 'shadow-pink-500/20',
    cyan: 'shadow-cyan-500/20',
    green: 'shadow-green-500/20'
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`
        backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20
        hover:border-purple-500/40 transition-all duration-300
        hover:shadow-2xl ${glowClasses[color]}
      `}
      style={{ background: 'rgba(10, 9, 26, 0.8)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg ${glowClasses[color]}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};
