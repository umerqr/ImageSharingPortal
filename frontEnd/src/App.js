import { Route, Router, Switch } from 'react-router-dom';
import './App.css';
import { AuthConsumer } from './components/auth/authContext';
import HomePage from './components/Homepage/';
import Login from './components/Login/';

function App() {
  return (
    <AuthConsumer>
      {(authState) => (
        // <Router>
        <div>
          {authState.authenticated ? (
            <Switch>
              <Route path='/' render={(props) => <HomePage {...props} />} />
            </Switch>
          ) : (
            <Switch>
              <Route path='/' render={(props) => <Login {...props} />} />
            </Switch>
          )}
        </div>
        // {/* </Router> */}
      )}
    </AuthConsumer>
  );
}

export default App;
