import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500">{icon}</span>
          </div>
        )}
        <input
          className={`
            w-full px-4 py-3 rounded-xl
            text-white placeholder-gray-500
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-purple-500/50
            ${icon ? 'pl-12' : ''}
            ${error ? 'ring-2 ring-red-500/50' : ''}
            ${className}
          `}
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: error ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(168, 85, 247, 0.2)'
          }}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 rounded-xl
          text-white placeholder-gray-500
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-purple-500/50
          resize-none
          ${error ? 'ring-2 ring-red-500/50' : ''}
          ${className}
        `}
        style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: error ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(168, 85, 247, 0.2)'
        }}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

// New: Select component matching the design
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 rounded-xl
          text-white
          transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-purple-500/50
          cursor-pointer
          ${error ? 'ring-2 ring-red-500/50' : ''}
          ${className}
        `}
        style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: error ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(168, 85, 247, 0.2)'
        }}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-[#0f172a] text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};
