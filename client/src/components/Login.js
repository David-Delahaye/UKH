import React, { Component } from "react";
import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions'
import PropTypes from 'prop-types';
import form from "../modules/form/form.module.css";

class Login extends Component {
  formSubmit = async (e) => {
    e.preventDefault();
    this.props.loginUser(e);
  }

  render() {
    if(this.props.user.username !== 'guest'){
      this.props.history.push('/sites')
    }

    return (
      <form
      className={form.loginForm}
        onSubmit={(e) => {
          this.formSubmit(e);
        }}
      >
        <div className={form.innerLoginForm}>
        <h1>Login</h1>
        <input className={form.textInput} type="text" name="username" placeholder="username" />
        <input className={form.textInput} type="password" name="password" placeholder="password" />
        <button className={form.btnPrimary}>Login</button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {loginUser})(Login);
