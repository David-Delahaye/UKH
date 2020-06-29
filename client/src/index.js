import React, { Component } from 'react';
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
import Register from './components/Register';

class App extends Component{
  constructor(props){
    super(props);
    this.handleUser = this.handleUser.bind(this);
    this.state = {
      user:'guest'
    }
  }

  handleUser = (username) => {
    this.setState({user:username});
  }

  getUser = async () => {
    try {
      const response = await fetch('/api/user', {
        headers:{
            "accepts":"application/json"
        }
        });
    const jsonData = await response.json();
    console.log(jsonData);
    this.handleUser(jsonData.username);
    } catch (err) {
      console.error(err.message);
      
    }
  }

  componentDidMount(){
    this.getUser();
  }

  render(){
    return(
      <React.StrictMode>
        <Router>
          <Nav username = {this.state.user} onUserChange = {this.handleUser}/>
          <Switch>
            <Route path="/new">
              <NewSite />
            </Route>
            <Route path="/index">
              <Sites />
            </Route>
            <Route path="/login">
              <Login onUserChange = {this.handleUser}/>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/sites/:site" component={Site}/>
          </Switch>
        </Router>
      </React.StrictMode>
    )
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
