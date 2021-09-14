import React from 'react';
import PropTypes from 'prop-types';
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
      <div>Image ID: {subItem}</div>
    </Popper>
  );
}

AppPopper.propTypes = {
  anchorEl: PropTypes.any,
  handleMouseLeave: PropTypes.func,
  subItem: PropTypes.any,
};

export default AppPopper;
