import { Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthConsumer } from './containers/auth/authContext';
import HomePage from './containers/Homepage/';
import Login from './components/Login/';
import 'antd/dist/antd.css';

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
