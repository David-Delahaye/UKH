import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions'
import PropTypes from 'prop-types';
import form from "../modules/form/form.module.css";


class Messages extends Component {
    constructor(props) {
      super(props);
    }
    render(){
        return(
        <div>{this.props.message.content}</div>
        )
    }
}


const mapStateToProps = state => ({
    message: state.messages.item
  })

export default connect(mapStateToProps, null)(Messages);