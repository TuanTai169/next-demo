import { createContext, useContext } from 'react';
type User = {
  fullName: string;
  email: string;
  role: string;
};

export const AuthContext = createContext<User | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return null;
  }
  return context;
};
