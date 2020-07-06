import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Logout from './Logout';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'
import PropTypes from 'prop-types';

class Nav extends Component {

render(){
  if (this.props.user.username !== 'guest'){
    return(
      <nav>
        <h1>UKC</h1>
        <Link to="/index">All sites</Link>
        <Link to="/new">Add site</Link>
        <p>{this.props.user.username}</p>
        <Logout onUserChange = {this.props.onUserChange} onMessageChange = {this.props.onMessageChange}/>
      </nav>
    )
  }else{
  return(
    <nav>
      <h1>UKC</h1>
      <Link to="/index">All sites</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )}
}
}

Nav.propTypes = {
  user : PropTypes.object.isRequired,
  logoutUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {logoutUser})(Nav);

