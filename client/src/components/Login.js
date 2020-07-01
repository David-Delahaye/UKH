import React, { Component } from "react";
import { Redirect} from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:false,
    };
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

        const jsonData = await response.json();
        if (response.status === 200){
          this.setState({redirect:'/index'});
          this.props.onMessageChange(jsonData.message);
          this.props.onUserChange(jsonData.username);

        }else if (response.status === 401){
          this.props.onMessageChange(jsonData.message);
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
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="password" placeholder="password" />
        <button>Add</button>
      </form>
    );
  }
}

export default Login;
