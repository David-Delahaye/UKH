import React, { Component } from "react";
import { Redirect} from "react-router-dom";

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
        onSubmit={(e) => {
          this.formSubmit(e);
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
