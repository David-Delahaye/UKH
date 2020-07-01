import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Logout from './Logout';

class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect:false
    }
  }

    



render(){
  if (this.state.redirect){
    return <Redirect to ={this.state.redirect}/>
  }
  if (this.props.username !== 'guest'){
    return(
      <nav>
        <h1>UKC</h1>
        <Link to="/index">All sites</Link>
        <Link to="/new">Add site</Link>
        <p>{this.props.username}</p>
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

export default Nav;

