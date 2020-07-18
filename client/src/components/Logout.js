import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/authActions'
import PropTypes from 'prop-types';

class Logout extends Component{
    constructor(props){
        super(props);
        this.state ={
            redirect:false
        }
    }

logout = async ()=>{
    this.props.logoutUser();
    this.setState({redirect:'/index'})
  }

  render(){
      if(this.state.redirect){
          return <Redirect to ={this.state.redirect}/>
      }
      return(
        <a onClick={() =>{this.logout()}}>Logout</a>
      )
  }
}
  
Logout.propTypes = {
  logoutUser : PropTypes.func.isRequired
}

export default connect(null, {logoutUser})(Logout);

