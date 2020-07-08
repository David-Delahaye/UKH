import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions'
import PropTypes from 'prop-types';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  formSubmit = async (e) => {
    e.preventDefault();
    this.props.loginUser(e);
    

  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          this.formSubmit(e);
        }}
      >
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button>Add</button>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser : PropTypes.func.isRequired
}

export default connect(null, {loginUser})(Login);
