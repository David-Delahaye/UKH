import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { render } from 'react-dom';


class Nav extends Component {
  constructor(){
    super()
    this.state = {}
  }

    logout = async ()=>{
      try {
        const response = await fetch('/api/logout', {
          headers:{
              "accepts":"application/json"
          }
      });
        console.log(response);
      } catch (err) {
        console.error(err.message);
      }
    }

render(){
  return(
    <nav>
      <h1>UKC</h1>
      <Link to="/index">All sites</Link>
      <Link to="/new">Add site</Link>
      <Link to="/login">Login</Link>
      <a onClick={() =>{this.logout()}}>Logout</a>
      <Link to="/register">Register</Link>
    </nav>
  )
}
}

export default Nav;

