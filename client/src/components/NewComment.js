import React, { Component, Fragment } from "react";
import { Redirect} from "react-router-dom";

class Comments extends Component{
    constructor(props){
        super(props);
    }

    postComment = async (e) => {
        e.preventDefault()
        try {
          const commentTitle = e.target.commentTitle.value;
          const commentDesc = e.target.commentDesc.value;
          const commentScore = e.target.commentScore.value;
          const body = {commentDesc, commentTitle, commentScore}
          const id = this.props.id;
          const response = await fetch(`/api/sites/${id}/comments/`,{
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(body)
          })
          const jsonData = await response.json();
          this.props.onMessageChange(jsonData.message);
        } catch (error) {
          console.log(error);
        }
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

export default Comments