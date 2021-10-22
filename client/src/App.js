
import Single from './pages/Single/Single';
import Topbar from './components/Topbar/Topbar';
import Write from './pages/Write/Write';
import Home from './pages/Home/Home';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import Register from './pages/Resigter/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useContext } from 'react';
import { ContextApi } from './context/context';

function App() {
  const {user, dispatch} = useContext(ContextApi);
 
  return (
    <div className="App">
      <Router>
        <Topbar />
        <Switch>
          <Route path="/" exact>   <Home /> </Route>
          <Route path="/register"> {user ? <Home /> :<Register />} </Route>
          <Route path="/login">   {user ? <Home />  :   <Login/> } </Route>
          <Route path="/settings">  {user ? <Settings /> : <Login />}</Route>
          <Route path="/write"> {user ? <Write /> : <Login />} </Route>
          <Route path="/post/:id"> {user ? <Single /> : <Login />}</Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
