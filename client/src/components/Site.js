import React, { Component } from "react";

import Comment from "./Comment";
import NewComment from "./NewComment";


import { connect } from "react-redux";
import { deleteSite, fetchSite, updateSite} from "../actions/siteActions";
import { resetComments , fetchComments } from "../actions/commentActions";
import PropTypes from "prop-types";

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.match.params.site,
      edit:false,
      siteName:'',
      siteDesc:'',
    };
  }

  async componentDidMount() {
    await this.props.resetComments()
    await this.props.fetchSite(this.state.id)
    await this.props.fetchComments(this.state.id);
    this.setState({ siteName: this.props.site.site_name});
    this.setState({ siteDesc: this.props.site.description});
  }

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editControl = () => {
    this.setState({ edit: true });
  };

  editCancel = () => {
    this.setState({ siteName: this.props.site.site_name});
    this.setState({ siteDesc: this.props.site.description});
    this.setState({ edit: false });
  }

  formSubmit = (e) => {
    e.preventDefault()
    this.props.updateSite(this.props.site.site_id, e);
    this.setState({ edit: false });
  }

  deleteSite = async (id) => {
    await this.props.deleteSite(id);
    this.props.history.push('/index');
  };

  render() {
    let commentFormat = this.props.comments.map((e, i) => {
      return (
        <Comment
          key={i}
          siteID={this.props.site.site_id}
          comment={e}
          userID={this.props.user.userID}
        />
      );
    });

    let editDisplay = () => {
      return(
        <div>
            <h4>id: {this.props.site.site_id}</h4>
            <h4>owner: {this.props.site.owner}</h4>
          <form onSubmit = {(e) => this.formSubmit(e)}>
            <input type='text' name='siteName' onChange = {(e)=>{this.inputChange(e)}} value={this.state.siteName}/>
            <input type='text' name='siteDesc' onChange = {(e)=>{this.inputChange(e)}} value={this.state.siteDesc}/>
            <button>Confirm Changes</button>
          </form>
          <button onClick={() => this.editCancel()}>Cancel</button>
        </div>
        )}

      
    if(this.state.edit){
      return editDisplay();
    }
    
    return (
      <div>
        <h4>id: {this.props.site.site_id}</h4>
        <h4>owner: {this.props.site.owner}</h4>
        <h1>
          {this.props.site.site_name} - {this.props.site.average_score}
        </h1>
        <p>{this.props.site.description}</p>
        {this.props.site.isOwner ? (
          <div>
          <button onClick={() => this.editControl()}>
            Edit
          </button>
          <button onClick={() => this.deleteSite(this.props.site.site_id)}>
            Delete
          </button>
          </div>
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
  fetchComments : PropTypes.func.isRequired,
  updateSite : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  site: state.sites.item,
  comments : state.comments.items,
  user : state.auth.user
});

export default connect(mapStateToProps, {deleteSite, updateSite, fetchSite, fetchComments, resetComments})(Site);
