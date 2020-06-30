import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { render } from 'react-dom';


class Nav extends Component {
  constructor(props){
    super(props)
  }

    logout = async ()=>{
      try {
        const response = await fetch('/api/logout', {
          headers:{
              "accepts":"application/json"
          }
      });
        const jsonData = await response.json();
        console.log(jsonData);
        this.props.onMessageChange(jsonData.message);
        this.props.onUserChange('guest');
      } catch (err) {
        console.error(err.message);
      }
    }



render(){
  if (this.props.username !== 'guest'){
    return(
      <nav>
        <h1>UKC</h1>
        <Link to="/index">All sites</Link>
        <Link to="/new">Add site</Link>
        <p>{this.props.username}</p>
        <a onClick={() =>{this.logout()}}>Logout</a>
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

