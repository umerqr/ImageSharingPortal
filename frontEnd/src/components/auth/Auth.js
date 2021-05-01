import React, { useState } from 'react';
import { AuthProvider } from './authContext';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_CONST } from './constants';

const Auth = (props) => {
  const [state, setState] = useState({
    authenticated: false,
    user: {},
    accessToken: ``,
  });

  const dispatch = useDispatch();
  const logout = async () => {
    setState({
      authenticated: false,
      user: {},
      accessToken: ``,
      grantList: [],
    });
  };

  const handleLogin = (params) => {
    //   api call here
    console.log(`CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLEDDD`);
    dispatch(() => dispatch({ type: DEFAULT_CONST }));
    handleAuthentication();
  };

  const handleAuthentication = (user) => {
    if (user) {
      setSession(user);
    } else {
      setState({
        authenticated: false,
        user: {},
        accessToken: ``,
        grantList: [],
      });
    }
  };

  const setSession = async (data) => {
    axios.defaults.headers.common.token = `${data.token}`;
    if (data.token) {
      const user = {
        email: data.email,
      };
      setState({
        authenticated: true,
        user,
      });
      localStorage.setItem(`token`, data.token);
    } else {
      const user = {
        email: '',
      };
      setState({
        ...state,
        accountId: `guest`,
        authenticated: false,
        accessToken: '',
        user,
      });
    }
  };

  const authProviderValue = {
    ...state,
    logout: logout,
    setSession: setSession,
    handleLogin: handleLogin,
  };
  return (
    <AuthProvider value={authProviderValue}>{props.children}</AuthProvider>
  );
};

Auth.propTypes = {
  children: PropTypes.any,
};

export default Auth;
