import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
    this.handleMessage = this.handleMessage.bind(this);
    this.state = {
      user:'guest',
      message:{},
      messageOn:false
    }
  }

  handleUser = (user) => {
    this.setState({user});
  }

  handleMessage = (message) => {
    this.setState({message})
  }

  getUser = async () => {
    try {
      const response = await fetch('/api/user', {
        headers:{
            "accepts":"application/json"
        }
        });
    const jsonData = await response.json();
    this.handleUser(jsonData.username);
    } catch (err) {
      console.error(err.message);
      
    }
  }

  componentDidMount(){
    this.getUser();
    console.log(this);
  }

  render(){
    return(
        <Router>
          <Nav username = {this.state.user} onUserChange = {this.handleUser} onMessageChange = {this.handleMessage}/>
          <div>{this.state.message.content}</div>
          <Switch>
            <Route path="/new">
              <NewSite />
            </Route>
            <Route path="/index">
              <Sites />
            </Route>
            <Route path="/login">
              <Login onUserChange = {this.handleUser} onMessageChange = {this.handleMessage}/>
            </Route>
            <Route path="/register">
              <Register onMessageChange = {this.handleMessage}/>
            </Route>
            <Route path="/sites/:site">
              <Site  onMessageChange = {this.handleMessage}/>
            </Route>
          </Switch>
        </Router>
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
