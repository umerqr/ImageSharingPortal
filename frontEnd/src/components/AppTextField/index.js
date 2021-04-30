/**
 *
 * AppTextField
 *
 */

import React, { memo } from 'react';
import AppLabel from '../AppLabel';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import './styles.css';

const AppTextField = ({
  onFocus,
  name,
  value,
  stateToUpdate,
  label,
  className,
  placeholder,
  onChange,
  adornmentEnd = false,
  size,
  mainDivClassName,
  disabled,
  id,
  type,
  onBlur,
  autoFocus,
}) => {
  const handleChangeFields = (value, stateToUpdate) => {
    if (onChange) {
      onChange(value, stateToUpdate);
    } else {
      stateToUpdate(value);
    }
  };
  return (
    <div className={mainDivClassName}>
      <AppLabel className='app-text-heading' label={label} />
      <TextField
        autoFocus={autoFocus && autoFocus}
        name={name}
        onFocus={onFocus}
        className={`app-text-field-style ${className}`}
        value={value}
        disabled={disabled}
        onChange={(e) => handleChangeFields(e.target.value, stateToUpdate)}
        id={id ? id : `outlined-basic`}
        placeholder={placeholder}
        size={size}
        variant='outlined'
        type={type && type}
        onBlur={onBlur && onBlur}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>{adornmentEnd}</InputAdornment>
          ),
        }}
      />
    </div>
  );
};

AppTextField.propTypes = {
  label: PropTypes.string,
  onFocus: PropTypes.func,
  value: PropTypes.any.isRequired,
  stateToUpdate: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.any,
  placeholder: PropTypes.string,
  adornmentEnd: PropTypes.any,
  size: PropTypes.any,
  mainDivClassName: PropTypes.any,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string,
  onBlur: PropTypes.any,
  autoFocus: PropTypes.bool,
};

export default memo(AppTextField);
