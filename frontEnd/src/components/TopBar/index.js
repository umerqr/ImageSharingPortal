import React from 'react';
// import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import './styles.css';


function TopBar(props) {

  
  return (
    <AppBar position='static' className='top-bar-container'>
      <Toolbar variant='dense'>
        <div className='top-bar-dropdowns-container'>
          <div className='d-flex'>
      
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {};

export default TopBar;
