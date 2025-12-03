import { motion } from 'framer-motion';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#030014]">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Rings */}
        <div className="relative">
          <motion.div 
            className="w-20 h-20 rounded-full border-4 border-transparent"
            style={{ 
              borderTopColor: '#A855F7',
              borderRightColor: '#EC4899'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-2 rounded-full border-4 border-transparent"
            style={{ 
              borderBottomColor: '#06B6D4',
              borderLeftColor: '#A855F7'
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
        </div>
        
        {/* Text */}
        <motion.p 
          className="text-gray-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} rounded-full border-transparent`}
      style={{ 
        borderTopColor: '#A855F7',
        borderRightColor: '#EC4899'
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Inline loading for buttons and small areas
export const InlineLoader = () => (
  <div className="flex items-center justify-center p-8">
    <motion.div 
      className="w-8 h-8 rounded-full border-2 border-transparent"
      style={{ 
        borderTopColor: '#A855F7',
        borderRightColor: '#EC4899'
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  </div>
);
