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
        console.log('newMessage');
        this.setState({currentMessage:this.props.message.content})
        this.setState({messageActive:true})
        setTimeout(() => {this.setState({messageActive:false})}, 3000);
        }
      
      //display message
        if (this.state.messageActive){
        return(
        <div className='message'>{this.props.message.content}</div>
        )
        }
        return(
          ''
        )
    }
}


const mapStateToProps = state => ({
    message: state.messages.item
  })

export default connect(mapStateToProps, null)(Messages);