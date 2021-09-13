import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import './styles.css';
import { AuthContext } from '../../containers/auth/authContext';
import AppLabel from '../AppLabel';
import AppCustomToolTipComp from '../AppCustomToolTipComp';
import { logout } from '../../utils/images';
function TopBar(props) {
  const authState = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (stateToUpdate, event) => {
    stateToUpdate(event.currentTarget);
  };
  const handleClose = (stateToUpdate) => {
    stateToUpdate(null);
  };
  const emailInitials = authState.user.email;
  return (
    <AppBar position='static' className='top-bar-container'>
      <Toolbar variant='dense'>
        <div className='top-bar-dropdowns-container'>
          <div className='d-flex'></div>
        </div>
        <IconButton
          color='inherit'
          aria-label='open menu'
          edge='start'
          onClick={(e) => handleClick(setAnchorEl, e)}
          className='profile-icon-image-button-nav'
        >
          <AppCustomToolTipComp placement='bottom' title={emailInitials}>
            <Avatar alt={emailInitials} className='nav-profile-avatar-styling'>
              {emailInitials && emailInitials.charAt(0).toUpperCase()}
            </Avatar>
          </AppCustomToolTipComp>
        </IconButton>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          className='nav-bar-menu-container'
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => handleClose(setAnchorEl)}
          anchorOrigin={{
            vertical: `bottom`,
            horizontal: `right`,
          }}
          getContentAnchorEl={null}
        >
          <div className='nav-arrow_box'>
            <MenuItem
              className='d-flex flex-column nav-action-menu-item'
              disabled
            >
              <AppLabel label='User:' className='nav-org-label' />
              <AppLabel
                label={authState.user.name}
                className='ml-0 pl-0 nav-org-sub-label'
              />
            </MenuItem>
            <hr className='m-0' />
            <MenuItem
              className='nav-action-menu-item'
              onClick={() => authState.logout()}
            >
              <img src={logout} alt='/' className='nav-action-icon' />
              <AppLabel label='Logout' className='nav-action-label' />
            </MenuItem>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {};

export default TopBar;
