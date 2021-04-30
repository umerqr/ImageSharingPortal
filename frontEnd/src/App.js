import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage/';
import Login from './components/Login/';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
