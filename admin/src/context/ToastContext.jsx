import React, { createContext, useContext, useState, useCallback } from 'react';
import { assets } from '../assets/assets';

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToast({ id, message, type });
    setVisible(true);

    setTimeout(() => setVisible(false), 2000);

    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2400);
  }, []);

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return assets.check_icon;
      case 'error':
        return assets.x_icon;
      default:
        return assets.info_icon;
    }
  };

  const getToastStyle = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-600 text-white';
      case 'error':
        return 'bg-red-600 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-[9999] ${
            visible ? 'animate-fade-in-down' : 'animate-fade-out-up'
          }`}
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${getToastStyle(
              toast.type,
            )}`}
          >
            <img
              src={getToastIcon(toast.type)}
              alt="toast icon"
              className="w-5 h-5 invert brightness-0 select-none"
              draggable="false"
            />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastContextProvider');
  return context;
};
