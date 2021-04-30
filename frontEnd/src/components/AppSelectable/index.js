/**
 *
 * AppSelectable
 *
 */

import React from 'react';
import AppLabel from '../AppLabel';
import Select from 'react-select';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './styles.css';
import { withStyles, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const AppSelectable = ({
  stateToUpdate,
  className,
  value,
  incomingOptions,
  incomingHeader,
  isClearable,
  isMulti,
  onFocus,
  onChange,
  mainDivClassName,
  closeMenuOnSelect,
  name,
  incomingStyle,
  isDisabled,
  displayTooltip,
  incomingTooltipTitle,
  placeholder,
}) => {
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // minHeight: 50,
      boxShadow: `none`,
    }),
    singleValue: (provided) => ({
      ...provided,
      overflow: `visible`,
    }),
    valueContainer: (provided) => ({
      ...provided,
      maxHeight: `300px`,
      overflow: `auto`,
      cursor: `pointer`,
    }),
  };

  const handleSelectChange = (val, stateToUpdate, index) => {
    if (onChange) {
      if (val === null) {
        onChange((val = []), stateToUpdate, index);
      }
      onChange(val, stateToUpdate, index);
    } else {
      if (val === null) {
        stateToUpdate([]);
      } else {
        stateToUpdate(val);
      }
    }
  };
  const CustomInfoToolTip = withStyles({
    tooltip: {
      color: `#ff5252`,
      backgroundColor: `rgb(251, 238, 238)`,
      fontSize: 13,
      fontWeight: `100`,
      borderRadius: 3,
      // border: `1px solid #dee2e6`,
    },
  })(Tooltip);

  return (
    <div className={mainDivClassName}>
      <div className='app-selectable-heading-div'>
        <AppLabel
          className='content-label-heading'
          label={incomingHeader}
        />
        {displayTooltip && (
          <CustomInfoToolTip placement='top' title={incomingTooltipTitle}>
            <InfoIcon className='app-selectable-info-icon' />
          </CustomInfoToolTip>
        )}
      </div>
      <Select
        name={name}
        isMulti={isMulti}
        onFocus={onFocus}
        closeMenuOnSelect={closeMenuOnSelect}
        options={incomingOptions}
        isClearable={isClearable}
        placeholder={placeholder ? placeholder : `Select`}
        className={className}
        isDisabled={isDisabled}
        styles={incomingStyle ? incomingStyle : style}
        value={value}
        onChange={(val, index) => handleSelectChange(val, stateToUpdate, index)}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            neutral50: `#637282`,
            fontFamily: `Catamaran`,
          },
        })}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

AppSelectable.propTypes = {
  stateToUpdate: PropTypes.any,
  className: PropTypes.any,
  value: PropTypes.any,
  incomingOptions: PropTypes.any,
  incomingHeader: PropTypes.any,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onFocus: PropTypes.any,
  onChange: PropTypes.any,
  mainStyles: PropTypes.any,
  mainDivClassName: PropTypes.any,
  name: PropTypes.string,
  closeMenuOnSelect: PropTypes.bool,
  incomingStyle: PropTypes.any,
  isDisabled: PropTypes.bool,
  displayTooltip: PropTypes.bool,
  incomingTooltipTitle: PropTypes.string,
  placeholder: PropTypes.string,
};

export default AppSelectable;
