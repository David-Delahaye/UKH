import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { render } from "react-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      redirect:false,
    };
  }

  getCookies = async () => {

  }

  formSubmit = async (e) => {
    e.preventDefault()
    console.log(e);
    try {
        const username = e.target.username.value;
        const password = e.target.password.value;
        const body = {"username":username, "password":password}
        const response = await fetch("/api/register",{
          method: "POST",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify(body)
        });
        if (response.status === 200){
          this.setState({redirect:'/login'});
          
        }else{
          console.log('nope');
        }
    } catch (err) {
      console.error(err.message);
    }
  }

  render() {
    if (this.state.redirect){
      return<Redirect to ={this.state.redirect}/>
    }
    
    return (
      <form
        onSubmit={(e) => {
          this.formSubmit(e);
          this.getCookies();
        }}
      >
        <h1>Register</h1>
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button>Add</button>
      </form>
    );
  }
}

export default Register;
