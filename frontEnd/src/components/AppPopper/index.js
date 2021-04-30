import React from 'react';
// import PropTypes from 'prop-types';
import { Popper } from '@material-ui/core';
import './styles.css';
function AppPopper(props) {
  const { anchorEl, handleMouseLeave, subItem } = props;

  // on main div

  const open = Boolean(anchorEl);
  return (
    <Popper
      className={`popover-sub-items`}
      open={open}
      anchorEl={anchorEl}
      onClose={handleMouseLeave}
      placement='bottom'
      transition={true}
    >
      <img src={subItem} alt='t' className='preview-styling' />
    </Popper>
  );
}

AppPopper.propTypes = {};

export default AppPopper;
