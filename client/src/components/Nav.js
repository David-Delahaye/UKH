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
        <Link to="/">UKH</Link>
        <Link to="/sites">All Plants</Link>
        <Link to="/sites/new">Add Plant</Link>
        <p>{this.props.user.username}</p>
        <Logout/>
      </nav>
    )
  }else{
  return(
    <nav>
      <Link to="/">UKH</Link>
      <Link to="/sites">All Plant</Link>
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

