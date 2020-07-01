import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import { json } from "body-parser";

class Site extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      info: {},
      comments: [],
      redirect: false,
    };
  }

  async componentDidMount() {
    await this.getSite();
    await this.setState({ id: this.props.match.params.site });
    await this.getComments();

  }

  getSite = async () => {
    try {
      await this.setState({ id: this.props.match.params.site });
      const response = await fetch(`/api/sites/${this.state.id}`, {
        headers: {
          accepts: "application/json",
        },
      });
      const jsonData = await response.json();
      this.setState({ info: jsonData });
    } catch (err) {
      console.error(err.message);
    }
  };

  deleteSite = async (e, i) => {
    try {
      const id = this.state.id;
      const response = await fetch(`/api/sites/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(this.setState({ redirect: "/index" }));
    } catch (err) {
      console.error(err.message);
    }
  };

  postComment = async (e) => {
    try {
      const commentTitle = e.target.commentTitle.value;
      const commentDesc = e.target.commentDesc.value;
      const body = {commentDesc, commentTitle}
      const id = this.state.id;
      const response = await fetch(`/api/sites/${id}/comments/`,{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(body)
      })
    } catch (error) {
      console.log(error);
    }
}

getComments = async (e) => {
  try {
    const id = this.state.id;
    const response = await fetch(`/api/sites/${id}/comments/`,{
      headers: { "Content-Type" : "application/json"},
    })
    console.log(response);
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

      return (
        <div>
          <h4>id: {this.state.info.site_id}</h4>
          <h4>owner: {this.state.info.owner}</h4>
          <h1>{this.state.info.site_name}</h1>
          <p>{this.state.info.description}</p>
          {this.state.info.isOwner
          ? <button onClick={() => this.deleteSite()}>Delete</button>
          : <div/>
          }
        
          <form onSubmit = {(e) =>{this.postComment(e)}}>
            <input type='text' name ='commentTitle' placeholder='add a comment'/>
            <input type='text' name ='commentDesc' placeholder='description'/>
            <button>Add</button>
          </form>
        </div>
      );
    }
  }


export default Site;
