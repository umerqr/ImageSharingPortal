import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthConsumer } from './containers/auth/authContext';
import HomePage from './containers/Homepage/';
import Login from './components/Login/';
import 'antd/dist/antd.css';
import AppCircularProgress from './components/AppCircularProgress';

function App() {
  return (
    <AuthConsumer>
      {(authState) => (
        <div>
          {authState.authenticated ? (
            Object.keys(authState?.user).length === 0 ? (
              <div className='d-flex justify-content-center'>
                <AppCircularProgress className='forecast-summary-circular' />
              </div>
            ) : (
              <Switch>
                <Route path='/' render={(props) => <HomePage {...props} />} />
              </Switch>
            )
          ) : (
            <Switch>
              <Route path='/' render={(props) => <Login {...props} />} />
            </Switch>
          )}
        </div>
      )}
    </AuthConsumer>
  );
}

export default App;
