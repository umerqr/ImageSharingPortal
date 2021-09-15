/**
 *
 * AppSkeleton
 *
 */

import React from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';
import './styles.css';
// import styled from 'styled-components';

function AppSkeleton(props) {
  const { height, shape, width, className } = props;

  return (
    <Skeleton
      width={width}
      height={height}
      shape={shape}
      active
      className={`${className} default-skeleton-styling`}
    />
  );
}

AppSkeleton.propTypes = {
  height: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shape: PropTypes.string,
  className: PropTypes.string,
};

export default AppSkeleton;
