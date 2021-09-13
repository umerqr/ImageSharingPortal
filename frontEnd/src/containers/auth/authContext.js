import { createContext } from 'react';

export const AuthContext = createContext({
  authenticated: false,
  user: {},
  accessToken: ``,
  handleLogin: () => {},
  logout: () => {},
});
export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = AuthContext.Provider;
