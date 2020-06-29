import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { render } from "react-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  formSubmit = async (e) => {
    e.preventDefault()
    try {
        const username = e.target.username.value;
        const password = e.target.password.value;
        const body = {"username":username, "password":password}
        const response = await fetch("/api/login",{
          method: "POST",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify(body)
        });
    } catch (err) {
      console.error(err.message);
    }
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

export default Login;
