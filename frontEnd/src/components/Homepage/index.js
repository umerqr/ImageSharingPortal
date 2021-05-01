import React, { lazy } from 'react';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthConsumer } from '../auth/authContext';
import TopBar from '../TopBar';
import './styles.css';
const ContentHomepage = lazy(() => import(`../ContentHomepage`));
const Login = lazy(() => import(`../Login`));
// const NotFoundPage = lazy(() => import(`../NotFoundPage`));
// import PropTypes from 'prop-types';

function Homepage(props) {
  //   const {} = props;

  return (
    <div>
      <AuthConsumer>
        {(authState) =>
          authState.authenticated ? (
            <>
              <TopBar />
              <hr className='m-0'></hr>
              <Switch>
                <Suspense fallback={<div>Loading...</div>}>
                  <Route path='/homepage' component={ContentHomepage} />
                  <Route path='/' component={ContentHomepage} />
                </Suspense>
              </Switch>
            </>
          ) : (
            <Switch>
              <Suspense fallback={<div>Loading...</div>}>
                <Route path='/login' component={Login} />
                <Route exact path='/' component={Login} />
              </Suspense>
            </Switch>
          )
        }
      </AuthConsumer>
    </div>
  );
}

Homepage.propTypes = {};

export default Homepage;
