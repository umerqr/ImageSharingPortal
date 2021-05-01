import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';
import AppButton from '../AppButton';
import { Paper } from '@material-ui/core';
import './styles.css';
import AppTextField from '../AppTextField';
import { AuthContext } from '../auth/authContext';
import { notificationWithIcon } from '../../utils/notification';

export const isValidEmail = (email) => {
  // eslint-disable-next-line
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  const pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return pass.test(password);
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMail, setErrorMail] = useState(false);

  function handleEmailChange(value, stateToUpdate) {
    stateToUpdate(value);
    if (isValidEmail(value)) {
      setErrorMail(false);
    } else {
      setErrorMail(true);
    }
  }
  const authState = useContext(AuthContext);

  const handleSignIn = async () => {
    const loginCredentials = { email, password };
    if (email === `` || password === ``) {
      notificationWithIcon('error', `Error`, `Please add in both fields`);
    } else {
      return authState.handleLogin(loginCredentials);
    }
  };

  return (
    <>
      <div className='login-container'>
        <Paper className='login-inner-container' elevation={3}>
          <div className='form-header'>
            <h1 className='main-title'>Login to Image Portal App</h1>
            {/* <p className='sub-title'>Login</p> */}
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
          </div>

          <div className='d-flex align-items-end flex-column'>
            <AppButton
              className='btn-theme mb-2 mt-5'
              onClick={handleSignIn}
              label='Login'
            ></AppButton>
          </div>
        </Paper>
      </div>
    </>
  );
};

Login.propTypes = {};

export default Login;
