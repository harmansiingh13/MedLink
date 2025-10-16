import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();

    setToast({ id, message, type });

    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Top-center single toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 z-[9999] -translate-x-1/2">
          <div
            className={`p-3 rounded-lg shadow-md animate-fade-in-down text-sm font-medium transition-all
              ${
                toast.type === 'success'
                  ? 'bg-green-600 text-white'
                  : toast.type === 'error'
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 border border-gray-300 text-gray-800'
              }
            `}
          >
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
