import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions'
import PropTypes from 'prop-types';
import form from "../modules/form/form.module.css";


class Messages extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentMessage:'',
        messageActive:false
      }
    }

    render(){
      //on message change
        if (this.props.message.content !== this.state.currentMessage){
          const message = document.querySelector('#message');
          message.classList.add('active');
          setTimeout(() => {
            message.classList.remove('active')
          }, 3000);
        }
      
      //display message
        return(
        <div id= 'message' className='message'>{this.props.message.content}</div>
        )
    }
}


const mapStateToProps = state => ({
    message: state.messages.item
  })

export default connect(mapStateToProps, null)(Messages);