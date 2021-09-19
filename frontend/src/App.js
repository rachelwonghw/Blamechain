import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Logo from './components/Logo';
import './App.scss';
import Analytics from './pages/Analytics';
import History from './pages/History';
import Transcript from './pages/Transcript';

//TODO: add nav tab between history and analytics
const App = () => {
  return (
    <div className="App">
      <Logo className="App__logo" />
      <div className="App__tab">
        <div className="App__tab__button App__tab__button--active">History</div>
        <div className="App__tab__button App__tab__button--inactive App__tab__button--right">Analytics</div>
      </div>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
