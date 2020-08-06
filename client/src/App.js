import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

  import { HashRouter } from 'react-router-dom'

import Nav from './components/Nav';
import NewSite from './components/NewSite';
import Sites from './components/Sites';
import Site from './components/Site';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Messages from './components/Messages';

import {connect} from 'react-redux';
import {fetchUser} from './actions/authActions'
import PropTypes from 'prop-types';


class App extends Component{
  
  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return(
        <HashRouter>
          <Nav/>
          <Messages/>
          <Switch>
            <Route exact path ="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route exact path="/sites" component={Sites}/>
            <Route exact path="/sites/new" component={NewSite}/>
            <Route path="/sites/:site" component={Site}/>
          </Switch>
        </HashRouter>
    )
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  message: state.messages.item
})

export default connect(mapStateToProps, {fetchUser})(App);

