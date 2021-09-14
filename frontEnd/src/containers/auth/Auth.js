import React, { useEffect, useState } from 'react';
import { AuthProvider } from './authContext';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfoAction, loginAction } from './actions';

const Auth = (props) => {
  const [state, setState] = useState({
    authenticated: false,
    user: {},
    accessToken: ``,
  });

  const authReducerState = useSelector((state) => state.authReducer);
  const { incomingToken, userInfo } = authReducerState;
  const dispatch = useDispatch();
  const logout = async () => {
    localStorage.clear();
    setState({
      ...state,
      authenticated: false,
      user: {},
      accessToken: ``,
    });
  };

  const handleLogin = (params) => {
    dispatch(loginAction(params));
  };
  useEffect(() => {
    if (incomingToken && incomingToken !== ``) {
      setState({
        ...state,
        accessToken: incomingToken,
      });

      if (userInfo) {
        handleAuthentication(userInfo);
      }
    } else if (userInfo) {
      handleAuthentication(userInfo);
    }
  }, [incomingToken, userInfo]);

  useEffect(() => {
    const localToken = localStorage.getItem(`token`);
    const isAutheticated = localStorage.getItem(`authenticated`);
    if (localToken && !userInfo) {
      setState({ ...state, accessToken: localToken });
      axios.defaults.headers.common.token = `${localToken}`;
      dispatch(fetchUserInfoAction());
    }
    if (isAutheticated && !state.authenticated) {
      setState({
        ...state,
        authenticated: true,
      });
    }
  }, []);

  const handleAuthentication = (user) => {
    if (user) {
      setSession(user);
    } else {
      setState({
        ...state,
        authenticated: false,
        user: {},
        accessToken: ``,
      });
    }
  };
  const setSession = async (data) => {
    axios.defaults.headers.common.token = `${incomingToken}`;
    if (incomingToken) {
      setState({
        ...state,
        authenticated: true,
        user: data,
      });
      localStorage.setItem(`token`, incomingToken);
      localStorage.setItem(`authenticated`, true);
    } else {
      const user = {};
      setState({
        ...state,
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
