import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Logo from './components/Logo';
import './App.css';
import Analytics from './pages/Analytics';
import History from './pages/History';
import Transcript from './pages/Transcript';

//TODO: add nav tab between history and analytics
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
      <Logo className="App__logo" />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <History />
          </Route>
          <Route path="/analytics">
            <Analytics />
          </Route>
          <Route path="/transcript/:id">
            <Transcript date={1631910840000} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
