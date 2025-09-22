import React, {createContext, useContext, useState} from 'react';
import LoadingOverlay from '../components/CustomLoading/LoadingOverlay';

const AppLoadingContext = createContext();

export const AppLoadingProvider = ({children}) => {
  const [loading, setLoading] = useState(false);

  return (
    <AppLoadingContext.Provider value={{loading, setLoading}}>
      {children}
      {loading && <LoadingOverlay />}
    </AppLoadingContext.Provider>
  );
};

export const useAppLoading = () => useContext(AppLoadingContext);
