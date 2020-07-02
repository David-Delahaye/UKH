import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import Comment from "./Comment"

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      info: {},
      comments: [],
      redirect: false,
    };
  }

  async componentDidMount() {
    await this.setState({ id: window.location.pathname.substring(7)});
    await this.getSite(this.state.id);
    await this.getComments(this.state.id);

  }

  getSite = async (id) => {
    try {
      const response = await fetch(`/api/sites/${id}`, {
        headers: {
          accepts: "application/json",
        },
      });
      const jsonData = await response.json();
      this.setState({ info: jsonData});
    } catch (err) {
      console.error(err.message);
    }
  };

  deleteSite = async (id) => {
    try {
      const response = await fetch(`/api/sites/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(this.setState({ redirect: "/index" }));
    } catch (err) {
      console.error(err.message);
    }
  };

  postComment = async (e) => {
    e.preventDefault()
    try {
      const commentTitle = e.target.commentTitle.value;
      const commentDesc = e.target.commentDesc.value;
      const commentScore = e.target.commentScore.value;
      const body = {commentDesc, commentTitle, commentScore}
      const id = this.state.id;
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

getComments = async (id) => {
  try {
    const response = await fetch(`/api/sites/${id}/comments/`,{
      headers: { "Content-Type" : "application/json"},
    })
    const jsonData = await response.json();
    this.setState({comments:jsonData})
  } catch (error) {
    console.log(error);
  }
}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let commentFormat = this.state.comments.map ((e,i) => {
      return(
        <Comment key={i} comment={e}/>
      )
    })

      return (
        <div>
          <h4>id: {this.state.info.site_id}</h4>
          <h4>owner: {this.state.info.owner}</h4>
          <h1>{this.state.info.site_name} - {this.state.info.average_score}</h1>
          <p>{this.state.info.description}</p>
          {this.state.info.isOwner
          ? <button onClick={() => this.deleteSite(this.state.id)}>Delete</button>
          : <div/>
          }
        
          <form onSubmit = {(e) =>{this.postComment(e)}}>
            <input type='text' name ='commentTitle' placeholder='add a comment'/>
            <input type='text' name ='commentDesc' placeholder='description'/>
            <input type='number' name = 'commentScore' placeholder='rating'/>
            <button>Add</button>
          </form>
          {commentFormat}
        </div>
      );
    }
  }


export default Site;
