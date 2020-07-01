import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';

class Logout extends Component{
    constructor(props){
        super(props);
        this.state ={
            redirect:false
        }
    }


// boot to homescreen
// & remove user
logout = async ()=>{
    try {
      const response = await fetch('/api/logout', {
        headers:{
            "accepts":"application/json"
        }
    });
      const jsonData = await response.json();
      this.setState({redirect:'/index'})
      this.props.onMessageChange(jsonData.message);
      this.props.onUserChange('guest');

    } catch (err) {
      console.error(err.message);
    }
  }

  render(){
      if(this.state.redirect){
          return <Redirect to ={this.state.redirect}/>
      }
      return(
        <p onClick={() =>{this.logout()}}>Logout</p>
      )
  }
}
  

export default Logout;
