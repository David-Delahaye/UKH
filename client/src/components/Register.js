import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import form from "../modules/form/form.module.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:false,
    };
  }

  handleMessage = (message) => {
    this.props.onMessageChange(message)
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

        const jsonData = await response.json();
        if (response.status === 200){
          this.setState({redirect:'/login'});
          this.props.onMessageChange(jsonData.message);
          
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
        className={form.loginForm}
        onSubmit={(e) => {
          this.formSubmit(e);
        }}
      >
        <div className={form.innerLoginForm}>
        <h1>Register</h1>
        <input className={form.textInput} type="text" name="username" placeholder="username" />
        <input className={form.textInput} type="password" name="password" placeholder="password" />
        <button className={form.btnPrimary} > Register Now</button>
        </div>
      </form>
    );
  }
}

export default Register;
