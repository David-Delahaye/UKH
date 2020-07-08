import React, { Component } from "react";

import Comment from "./Comment";
import NewComment from "./NewComment";
import Stars from "./Stars"
import site from "../modules/site/site.module.css";


import { connect } from "react-redux";
import { deleteSite, getSite, fetchSite, updateSite} from "../actions/siteActions";
import { resetComments , fetchComments } from "../actions/commentActions";
import PropTypes from "prop-types";
import stars from "./Stars";

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
    await this.props.getSite(this.state.id);
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

    let editDisplay = 
    (
        <div>
          <form onSubmit = {(e) => this.formSubmit(e)}>
            <input type='text' name='siteName' onChange = {(e)=>{this.inputChange(e)}} value={this.state.siteName}/>
            <input type='text' name='siteDesc' onChange = {(e)=>{this.inputChange(e)}} value={this.state.siteDesc}/>
            <button>Confirm Changes</button>
          </form>
          <button onClick={() => this.editCancel()}>Cancel</button>
        </div>
    )

    let siteContent = 
    (
        <div>
        <header className={`container ${site.header}`}>
          <div className={site.imageOverlay}/>
          <img className={site.image} src='https://images.unsplash.com/photo-1591461924959-125450884b14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'/>
          <div className={site.headline}> 
          <h2>{this.props.site.site_name}</h2>
          <div className={site.starsWrapper}>
           {stars(this.props.site.average_score)}
          </div>
          </div>
        </header>
        <h4>owner: {this.props.site.owner}</h4>
        <p>{this.props.site.description}</p>
        </div>
    )

    let ownerBar = 
    (
      this.props.site.isOwner ? (
        <div>
          <button onClick={() => this.editControl()}>
            Edit
          </button>
          <button onClick={() => this.deleteSite(this.props.site.site_id)}>
            Delete
          </button>
        </div>
      ) : (
        'tttt'
      ))


    if(this.state.edit){
      return editDisplay
    }
    
    return (
      <div>
        {siteContent}
        {ownerBar}
        <NewComment siteID={this.props.site.site_id}/>
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

export default connect(mapStateToProps, {deleteSite, getSite, updateSite, fetchSite, fetchComments, resetComments})(Site);
