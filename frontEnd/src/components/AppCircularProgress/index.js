/**
 *
 * AppCircularProgress
 *
 */

import React, { memo, } from 'react'
import { CircularProgress, } from '@material-ui/core'
import './styles.css'
import PropTypes from 'prop-types'
// import styled from 'styled-components';

function AppCircularProgress ({
    size,
    className,
}) {
    return  <CircularProgress className={className ? className :`app-circular-loader`} size={size}/>
}

AppCircularProgress.propTypes = {
    size: PropTypes.number,
    className: PropTypes.string,
}

export default memo(AppCircularProgress)
