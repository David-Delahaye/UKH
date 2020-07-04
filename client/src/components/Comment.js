import React, { Component, Fragment } from "react";
import { Redirect} from "react-router-dom";

class Comments extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const e = this.props.comment;
        return(
            <div key={this.props.key}>
                <h3>{e.comment_title}</h3>
                <p>{e.comment_score}</p>
                <p>{e.comment_description}</p>
                <p> by - {e.owner_name}</p>
                {(this.props.userID === e.owner_id
                ? <div>OWNER</div>
                : <div>NON-OWNER</div>
                )}
            </div>
            
        )
    }
}

export default Comments