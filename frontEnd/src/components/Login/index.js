import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AppButton from '../AppButton';
import { Checkbox, FormControlLabel, Paper } from '@material-ui/core';
import './styles.css';
import AppTextField from '../AppTextField';
import AppLabel from '../AppLabel';
import { AuthContext } from '../auth/authContext';

export const isValidEmail = (email) => {
  // eslint-disable-next-line
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  const pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return pass.test(password);
};

const infoData = {
  email: `user@gmail.com`,
  password: `123`,
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMail, setErrorMail] = useState(false);

  const history = useHistory();
  const mockData = { mail: infoData.email, password: infoData.password };
  const adminMockData = { mail: 'admin@gmail.com', password: 'admin' };
  function onChange(e) {
    setChecked(e.target.checked);
  }

  // useEffect(() => {
  //   window.localStorage.removeItem('loggedInEmail');
  //   if (localStorage.checkbox && localStorage.email !== '') {
  //     setChecked(true);
  //     setEmail(localStorage.username);
  //     setPassword(localStorage.password);
  //   } else {
  //     setChecked(false);
  //   }
  // }, []);

  // function handlePasswordChange(e) {
  //   setPassword(e.target.value);
  // }

  function handleEmailChange(value, stateToUpdate) {
    stateToUpdate(value);
    if (isValidEmail(value)) {
      setErrorMail(false);
    } else {
      setErrorMail(true);
    }
  }
  const authState = useContext(AuthContext);

  console.log(authState, `asd`);
  const handleSignIn = async () => {
    const loginCredentials = { email, password };
    authState.handleLogin(loginCredentials);
    if (email === `` || password === ``) {
      alert(`Please add in both fields`);
    } else {
      console.log(authState, `handlesign in came?`);
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
            {error ? (
              <AppLabel label='Error, No User found.' className='error-text' />
            ) : null}
          </div>

          <div className={error ? 'login-footer-error' : 'login-footer'}>
            <div className='remember-password'>
              <FormControlLabel
                control={
                  <Checkbox
                    className='remenber-text'
                    onChange={onChange}
                    checked={checked}
                  />
                }
                label={<AppLabel label='Remember me' />}
              />
            </div>
          </div>
          <div className='d-flex align-items-end flex-column'>
            <AppButton
              className='btn-theme mb-2'
              onClick={handleSignIn}
              label='login'
            ></AppButton>
          </div>
        </Paper>
      </div>
    </>
  );
};

Login.propTypes = {
  infoData: PropTypes.shape({
    country: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    contact: PropTypes.number.isRequired,
  }).isRequired,
};

export default Login;
