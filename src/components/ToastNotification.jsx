import React from 'react';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const ToastNotification = ({ 
  type = 'info', 
  title, 
  message, 
  action, 
  onAction,
  onClose,
  duration = 5000 
}) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'text-green-600 bg-green-50 border-green-200',
    error: 'text-red-600 bg-red-50 border-red-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200',
  };

  const Icon = icons[type];

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full border rounded-lg shadow-lg ${colors[type]} transition-all duration-300 transform translate-x-0`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <div className="ml-3 w-0 flex-1">
            {title && (
              <p className="text-sm font-medium">
                {title}
              </p>
            )}
            {message && (
              <p className="text-sm mt-1">
                {message}
              </p>
            )}
            {action && (
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onAction}
                  className="text-xs"
                >
                  {action}
                </Button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
              onClick={onClose}
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;