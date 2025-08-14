import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ 
  size = 'default', 
  text = 'Loading...', 
  className = '',
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    default: 'text-base',
    lg: 'text-lg'
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
          <p className={`${textSizeClasses[size]} text-muted-foreground`}>
            {text}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      <span className={`${textSizeClasses[size]} text-muted-foreground`}>
        {text}
      </span>
    </div>
  );
};

export default LoadingSpinner;