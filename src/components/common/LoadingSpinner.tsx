import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  fullScreen = false,
  text
}) => {
  // Size mappings
  const sizeMap = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4',
  };
  
  const spinnerSize = sizeMap[size];
  
  // Full screen loading overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center">
          <div className={`${spinnerSize} border-t-primary-600 border-primary-200 rounded-full animate-spin`}></div>
          {text && <p className="mt-4 text-primary-800 font-medium">{text}</p>}
        </div>
      </div>
    );
  }
  
  // Inline spinner
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className={`${spinnerSize} border-t-primary-600 border-primary-200 rounded-full animate-spin`}></div>
      {text && <p className="mt-2 text-primary-800 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;