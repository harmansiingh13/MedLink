import { createContext, useContext, useState, useCallback } from 'react';
import { CircleCheck, CircleX } from '../icons/Icons';

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((message, type) => {
    if (!['success', 'error'].includes(type)) return;

    const id = Date.now();
    setToast({ id, message, type });
    setVisible(true);

    setTimeout(() => setVisible(false), 2000);
    setTimeout(() => setToast((current) => (current?.id === id ? null : current)), 2400);
  }, []);

  const getToastIcon = (type) => {
    return type === 'success' ? (
      <CircleCheck className="w-5 h-5" />
    ) : (
      <CircleX className="w-5 h-5" />
    );
  };

  const getToastStyle = (type) => {
    return type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white';
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
            {getToastIcon(toast.type)}
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
