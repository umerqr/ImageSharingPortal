import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import AppButton from '../AppButton';
import { Paper } from '@material-ui/core';
import './styles.css';
import AppTextField from '../AppTextField';
import { AuthContext } from '../../containers/auth/authContext';
import { notificationWithIcon } from '../../utils/notification';
import AppCircularProgress from '../AppCircularProgress';
import { logoTransparent } from '../../utils/images';

export const isValidEmail = (email) => {
  let re =
    // eslint-disable-next-line
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  const pass = /^.{6,}$/;
  return pass.test(password);
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  function handleEmailChange(value, stateToUpdate) {
    stateToUpdate(value);
  }
  useEffect(() => {
    if (email !== '') {
      if (isValidEmail(email)) {
        setErrorMail(false);
      } else {
        setErrorMail(true);
      }
    }
    if (password !== '') {
      if (isValidPassword(password)) {
        setErrorPassword(false);
      } else {
        setErrorPassword(true);
      }
    }
  }, [email, password]);
  const authState = useContext(AuthContext);

  const handleSignIn = async () => {
    const loginCredentials = { email, password };
    if (email === `` || password === ``) {
      notificationWithIcon('error', `Error`, `Please add in both fields`);
      if (email === '') setErrorMail(true);
      if (password === '') setErrorPassword(true);
    } else {
      return authState.handleLogin(loginCredentials, setLoading);
    }
  };
  const handleEnterKey = (event) => {
    if (event.key === `Enter`) {
      return handleSignIn();
    } else return;
  };
  return (
    <>
      <div className='login-container'>
        <Paper
          className='login-inner-container'
          onKeyDown={(event) => handleEnterKey(event)}
          elevation={3}
        >
          <div className='form-header'>
            <span className='d-flex justify-content-center align-items-center'>
              <img
                src={logoTransparent}
                alt='/'
                className={'login-logo-styling'}
              />
              <h1 className='main-title'>Image Portal</h1>
            </span>
            <p className='sub-title'>Sign in below</p>
          </div>
          <div>
            <div>
              <AppTextField
                autoFocus
                type='email'
                required
                label='Email'
                onChange={handleEmailChange}
                value={email}
                stateToUpdate={setEmail}
                className='login-text-field-styling'
              />
            </div>
            {errorMail ? (
              <span className='error-text'>Please enter a proper email.</span>
            ) : null}
          </div>
          <div>
            <div className='login-password-main'>
              <AppTextField
                type='password'
                label='Password'
                placeholder=''
                name='password'
                className='login-text-field-styling'
                required
                value={password}
                stateToUpdate={setPassword}
              />
            </div>
            {errorPassword ? (
              <span className='error-text'>
                Please enter a proper password.
              </span>
            ) : null}
          </div>

          <div className='d-flex align-items-end flex-column'>
            {loading ? (
              <AppCircularProgress />
            ) : (
              <AppButton
                className='btn-theme mb-2 mt-5'
                onClick={handleSignIn}
                label='Login'
              ></AppButton>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
};

Login.propTypes = {};

export default Login;
