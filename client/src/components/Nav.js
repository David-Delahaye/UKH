import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Logout from './Logout';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'
import PropTypes from 'prop-types';
import nav from "../modules/nav/nav.module.css";
import { newSearch } from '../actions/siteActions';

class Nav extends Component {
  constructor(props){
    super(props)
  }

  showMenu = (e) => {
    console.log('clicked');
    const menu = document.querySelector('#menu');
    const burger = document.querySelector('#burger');
    burger.classList.toggle(nav.closedBurger) 
    menu.classList.toggle(nav.closed) 
  }

render(){
  if (this.props.user.username !== 'guest'){
    return(
      <nav>
        <Link to="/">UKH</Link>
        <div id='burger' className={nav.burger} onClick={(e) => {this.showMenu(e)}}>
          <div/>
          <div/>
          <div/>
        </div>
        <div id='menu' className={nav.rightNav + ' ' + nav.phoneMenu + ' ' + nav.closed}>
          <Link onClick={(e) => {this.showMenu(e)}} to="/sites">All Plants</Link>
          <Link onClick={(e) => {this.showMenu(e)}} to="/sites/new">Add Plant</Link>
          <Link>Logged in as {this.props.user.username}</Link>
          <Logout onClick={(e) => {this.showMenu(e)}}/>
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

