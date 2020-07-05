import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import Comment from "./Comment"
import NewComment from "./NewComment"

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
        <Comment key={i} siteID ={this.state.id} comment={e} userID={this.props.userID}/>
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
          <NewComment siteID = {this.state.id} onMessageChange = {this.props.onMessageChange}/>
          {commentFormat}
        </div>
      );
    }
  }


export default Site;
