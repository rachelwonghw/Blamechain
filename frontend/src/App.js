import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Analytics from './pages/Analytics';
import History from './pages/History';

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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
