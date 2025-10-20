import React, { createContext, useContext, useState, useCallback } from 'react';

const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => setIsLoading(true), []);
  const hideLoader = useCallback(() => setIsLoading(false), []);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}

      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black/60 to-gray-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative flex flex-col items-center">
            <div className="absolute w-20 h-20 border-4 border-primary/20 rounded-full animate-ping-slow"></div>

            <div className="relative w-14 h-14">
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-primary border-r-primary rounded-full animate-spin-slow"></div>
            </div>

            <p className="mt-5 text-white/90 font-semibold tracking-wide text-sm uppercase animate-pulse">
              Please wait...
            </p>
          </div>
        </div>
      )}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderContextProvider');
  }
  return context;
};
