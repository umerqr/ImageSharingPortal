import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import AppLabel from '../AppLabel';

function AppButton(props) {
  const {
    name,
    className,
    onClick,
    disabled,
    label,
    src,
    appButtonLabelClassName,
  } = props;
  return (
    <>
      <button
        type={`button`}
        name={name || `button`}
        className={`${className} app-btn-theme`}
        onClick={onClick}
        disabled={disabled || false}
      >
        {src && <img className='app-button-image' src={src} alt={`...`} />}
        <AppLabel className={appButtonLabelClassName} label={label} />
      </button>
    </>
  );
}
AppButton.defaultProps = {
  onClick: false,
  name: false,
  className: false,
  disabled: false,
  label: false,
};
AppButton.propTypes = {
  name: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onClick: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  label: PropTypes.string,
  appButtonLabelClassName: PropTypes.string,
  src: PropTypes.string,
};

export default AppButton;
