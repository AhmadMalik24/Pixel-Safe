import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Types of notifications
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// Toast data structure
export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Create a custom event for showing toasts
interface ToastEvent extends CustomEvent {
  detail: {
    message: string;
    type: ToastType;
  };
}

// Global toast handler function
export const toast = {
  success: (message: string) => {
    const event = new CustomEvent('toast', {
      detail: { message, type: 'success' },
    }) as ToastEvent;
    window.dispatchEvent(event);
  },
  error: (message: string) => {
    const event = new CustomEvent('toast', {
      detail: { message, type: 'error' },
    }) as ToastEvent;
    window.dispatchEvent(event);
  },
  info: (message: string) => {
    const event = new CustomEvent('toast', {
      detail: { message, type: 'info' },
    }) as ToastEvent;
    window.dispatchEvent(event);
  },
  warning: (message: string) => {
    const event = new CustomEvent('toast', {
      detail: { message, type: 'warning' },
    }) as ToastEvent;
    window.dispatchEvent(event);
  },
};

export const Toaster = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  useEffect(() => {
    const handleToast = (event: Event) => {
      const { message, type } = (event as ToastEvent).detail;
      const id = Date.now().toString();
      setToasts((prev) => [...prev, { id, message, type }]);
      
      // Auto-remove toast after 5 seconds
      setTimeout(() => {
        removeToast(id);
      }, 5000);
    };
    
    window.addEventListener('toast', handleToast);
    
    return () => {
      window.removeEventListener('toast', handleToast);
    };
  }, []);
  
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  // Get color styles based on toast type
  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-success-50 border-success-500 text-success-700';
      case 'error':
        return 'bg-error-50 border-error-500 text-error-700';
      case 'warning':
        return 'bg-warning-50 border-warning-500 text-warning-700';
      case 'info':
      default:
        return 'bg-primary-50 border-primary-500 text-primary-700';
    }
  };
  
  // Get icon based on toast type
  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5 text-error-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-warning-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  if (toasts.length === 0) return null;
  
  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 space-y-4 max-w-xs sm:max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getToastStyles(toast.type)} border-l-4 p-4 rounded-md shadow-md flex items-start justify-between animate-slide-up`}
          role="alert"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              {getToastIcon(toast.type)}
            </div>
            <div>
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
          </div>
          <button
            type="button"
            className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            onClick={() => removeToast(toast.id)}
          >
            <span className="sr-only">Close</span>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};