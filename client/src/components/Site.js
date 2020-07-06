import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { connect } from "react-redux";
import { deleteSite, fetchSite} from "../actions/siteActions";
import { resetComments , fetchComments } from "../actions/commentActions";
import PropTypes from "prop-types";

class Site extends Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  async componentDidMount() {
    await this.props.resetComments()
    await this.setState({ id: window.location.pathname.substring(7)});
    await this.props.fetchSite(this.state.id)
    await this.props.fetchComments(this.state.id);
  }

  deleteSite = async (id) => {
    await this.props.deleteSite(id);
    this.setState({ redirect: "/index" });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let commentFormat = this.props.comments.map((e, i) => {
      console.log(i);
      console.log(this.props.site.site_id);
      console.log(e);
      console.log(this.props.userID);
      
      return (
        <Comment
          key={i}
          siteID={this.props.site.site_id}
          comment={e}
          userID={this.props.user.userID}
        />
      );
    });

    return (
      <div>
        <h4>id: {this.props.site.site_id}</h4>
        <h4>owner: {this.props.site.owner}</h4>
        <h1>
          {this.props.site.site_name} - {this.props.site.average_score}
        </h1>
        <p>{this.props.site.description}</p>
        {this.props.site.isOwner ? (
          <button onClick={() => this.deleteSite(this.props.site.site_id)}>
            Delete
          </button>
        ) : (
          <div />
        )}
        <NewComment
          siteID={this.props.site.site_id}
        />
        {commentFormat}
      </div>
    );
  }
}

Site.propTypes = {
  deleteSite: PropTypes.func.isRequired,
  fetchSite: PropTypes.func.isRequired,
  fetchComments : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  site: state.sites.item,
  comments : state.comments.items,
  user : state.auth.user
});

export default connect(mapStateToProps, {deleteSite, fetchSite, fetchComments, resetComments})(Site);
