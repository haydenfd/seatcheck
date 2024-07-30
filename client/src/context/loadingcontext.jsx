import { createContext, useContext, useState } from "react";

export const LoadingContext = createContext({});

export const LoadProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setToLoad = () => {
    setIsLoading(true);
  };
  const setLoaded = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        setToLoad,
        setLoaded,
        isLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};
