import React, { Component} from "react";
import { connect } from "react-redux";
import { deleteComment} from "../actions/commentActions";
import PropTypes from "prop-types";

class Comment extends Component{


    render(){
        const e = this.props.comment;
        return(
            <div>
                <h3>{e.comment_title}</h3>
                <p>{e.comment_score}</p>
                <p>{e.comment_description}</p>
                <p> by - {e.owner_name}</p>
                {(this.props.userID === e.owner_id
                ? <div><button>Edit</button><button onClick={()=>this.props.deleteComment(this.props.siteID, e.comment_id)}>delete</button></div>
                : ''
                )}
            </div>
            
        )
    }
}

export default connect(null, {deleteComment})(Comment);
