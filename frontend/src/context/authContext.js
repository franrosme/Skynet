import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};
