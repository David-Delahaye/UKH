import React, { Component } from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newComment} from '../actions/commentActions';
class Comments extends Component{

    postComment = async (e) => {
        e.preventDefault()
        this.props.newComment(e, this.props.siteID)
    }

    render(){
        return(
            <form onSubmit = {(e) =>{this.postComment(e)}}>
                <input type='text' name ='commentTitle' placeholder='add a comment' required/>
                <input type='text' name ='commentDesc' placeholder='description' required/>
                <input type="range" name="commentScore" min="0" max="10" required/>
                <button>Add</button>
            </form>
        )
    }
}

Comments.propTypes = {
  newComment : PropTypes.func.isRequired
}

export default connect(null, {newComment})(Comments);