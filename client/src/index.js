import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './App.js';
const {Sites, NewSite} = App;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/new">
          <NewSite />
        </Route>
        <Route path="/index">
          <Sites />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
