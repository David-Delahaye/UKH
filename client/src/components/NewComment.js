import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newComment} from '../actions/commentActions';
import form from "../modules/form/form.module.css";

class Comments extends Component{

    postComment = async (e) => {
        e.preventDefault()
        this.props.newComment(e, this.props.siteID)
    }

    render(){
        return(
            <form className={form.newComment} onSubmit = {(e) =>{this.postComment(e)}}>
                <input className={form.text} type='text' name ='commentTitle' placeholder='Comment Title' required/>
                <input className={form.text} type='text' name ='commentDesc' placeholder='Comment Description' required/>
                <input className={form.scale} type="range" name="commentScore" min="0" max="10" required/>
                <button className={form.btnPrimary}>Add</button>
            </form>
        )
    }
}

Comments.propTypes = {
  newComment : PropTypes.func.isRequired
}

export default connect(null, {newComment})(Comments);