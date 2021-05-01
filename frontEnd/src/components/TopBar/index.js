import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import './styles.css';
import AppButton from '../AppButton';
import { AuthContext } from '../auth/authContext';

function TopBar(props) {
  const authState = useContext(AuthContext);
  return (
    <AppBar position='static' className='top-bar-container'>
      <Toolbar variant='dense'>
        <div className='top-bar-dropdowns-container'>
          <div className='d-flex'></div>
        </div>
        <AppButton label='Logout' onClick={() => authState.logout()} />
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {};

export default TopBar;
