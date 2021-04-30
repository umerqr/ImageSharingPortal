import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import './styles.css';

const AppLabel = ({ className, label, onClick }) => {
  return (
    <Typography
      onClick={onClick}
      className={`app-label-main-style ${className}`}
    >
      {label}
    </Typography>
  );
};

AppLabel.defaultProps = { className: false };
AppLabel.propTypes = {
  className: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default memo(AppLabel);
