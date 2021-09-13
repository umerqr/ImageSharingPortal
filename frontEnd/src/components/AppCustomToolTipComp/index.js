/**
 *
 * AppCustomToolTipComp
 *
 */

import { Tooltip, withStyles } from '@material-ui/core';
import { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const AppCustomToolTipComp = withStyles({
  tooltip: {
    color: `white`,
    backgroundColor: `rgb(133, 137, 169)`,
    fontSize: 13,
    fontWeight: `100`,
    borderRadius: 3,
  },
})(Tooltip);

AppCustomToolTipComp.propTypes = {};

export default memo(AppCustomToolTipComp);
