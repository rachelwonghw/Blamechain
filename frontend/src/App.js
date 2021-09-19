import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Analytics from './pages/Analytics';
import History from './pages/History';
import Transcript from './pages/Transcript';

//TODO: add nav tab between history and analytics and redirect / to /home
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
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
