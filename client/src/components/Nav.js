import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Logout from './Logout';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'
import PropTypes from 'prop-types';
import nav from "../modules/nav/nav.module.css";

class Nav extends Component {

render(){
  if (this.props.user.username !== 'guest'){
    return(
      <nav>
        <Link to="/">UKH</Link>
        <div className={nav.rightNav}>
        Logged in as {this.props.user.username}
        <Link to="/sites">All Plants</Link>
        <Link to="/sites/new">Add Plant</Link>
        <Logout/>
        </div>
      </nav>
    )
  }else{
  return(
    <nav>
      <Link to="/">UKH</Link>
      <div className={nav.rightNav}>
        <Link to="/sites">All Plant</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
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

