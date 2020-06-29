import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Nav from './components/Nav';
import NewSite from './components/NewSite';
import Sites from './components/Sites';
import Site from './components/Site';
import Login from './components/Login';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Nav/>
      <Switch>
        <Route path="/new">
          <NewSite />
        </Route>
        <Route path="/index">
          <Sites />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sites/:site" component={Site}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
