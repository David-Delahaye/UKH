import React, { Component, Fragment } from "react";
import { Redirect} from "react-router-dom";

class Comments extends Component{
    constructor(props){
        super(props);
    }

    deleteComment = async (id) => {
        try {
            console.log(this.props.siteID);
            
            console.log(id);
            
          const response = await fetch(`/api/sites/${this.props.siteID}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
        } catch (err) {
          console.error(err.message);
        }
      };

    render(){
        const e = this.props.comment;
        return(
            <div key={this.props.key}>
                <h3>{e.comment_title}</h3>
                <p>{e.comment_score}</p>
                <p>{e.comment_description}</p>
                <p> by - {e.owner_name}</p>
                {(this.props.userID === e.owner_id
                ? <div><button>Edit</button><button onClick={()=>this.deleteComment(e.comment_id)}>delete</button></div>
                : ''
                )}
            </div>
            
        )
    }
}

export default Comments