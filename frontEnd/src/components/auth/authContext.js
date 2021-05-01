import { createContext } from 'react';

export const AuthContext = createContext({
  authenticated: false, // to check if authenticated or not
  user: {}, // store all the user details
  accessToken: ``, // accessToken of user for
  handleLogin: () => {}, // handle login process
});
export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = AuthContext.Provider;
