import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { render } from 'react-dom';


class Nav extends Component {
render(){
  return(
    <nav>
      <h1>UKC</h1>
      <Link to="/index">All sites</Link>
      <Link to="/new">Add site</Link>
    </nav>
  )
}
}

export default Nav;

