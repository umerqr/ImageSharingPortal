/**
 *
 * ProtectedRoute
 *
 */

import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../../containers/auth/authContext';
const ProtectedRoute = ({ component: Component, name, ...rest }) => {
  const auth = useContext(AuthContext);
  const { user } = auth;
  const roles = user?.roles;
  const routeCheck = (name) => {
    if (roles?.length > 0 && roles.includes(name)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Route
      {...rest}
      render={(props) =>
        routeCheck(name) === true ? (
          <Component {...props} {...rest} />
        ) : (
          roles?.length !== 0 && (
            <Redirect
              {...rest}
              {...props}
              to={{
                pathname: `/notFound`,
              }}
            />
          )
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any,
  name: PropTypes.string,
};

export default memo(ProtectedRoute);
