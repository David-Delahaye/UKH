import React, { Component } from "react";

import Comment from "./Comment";
import NewComment from "./NewComment";
import site from "../modules/site/site.module.css";
import form from "../modules/form/form.module.css";
import DividerLight from "../images/DividerLight.png"


import { connect } from "react-redux";
import { deleteSite, getSite, fetchSite, updateSite} from "../actions/siteActions";
import { resetComments , fetchComments } from "../actions/commentActions";
import PropTypes from "prop-types";
import Stars from "./Stars";
import Tags from './Tags';

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded:false,
      id:this.props.match.params.site,
      edit:false,
      siteName:'',
      siteDesc:'',
      siteImage:'',
      tags:[],
    };
  }

  async componentDidMount() {
    await this.props.getSite(this.state.id);
    await this.props.resetComments()
    await this.props.fetchSite(this.state.id)
    await this.props.fetchComments(this.state.id);
    this.setState({ siteName: this.props.site.site_name});
    this.setState({ siteDesc: this.props.site.description});
    this.setState({ siteImage: this.props.site.image_link});
    const tags = await this.props.site.tags ? this.props.site.tags : [];
    this.setState({tags})
    this.setState({ loaded:true})
    console.log(this.props.site.tags);
    
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
    console.log(e.target);

    const title = e.target.siteName.value;
    const desc = e.target.siteDesc.value;
    const img = e.target.siteImage.value;
    const tags = this.state.tags;

    const body = {"siteName":title, "siteDesc":desc, "siteTags":tags, "siteImage":img}
    this.props.updateSite(this.props.site.site_id, body);
    this.setState({ edit: false });
  }

  deleteSite = async (id) => {
    await this.props.deleteSite(id);
    this.props.history.push('/sites');
  };

  handleTags = async (e) => {
    this.setState({tags:e})   
  }

  render() {
    if(this.state.loaded){
    let tagsFormat = this.props.site.tags.map((e, i) => {
      console.log('here');
      return (
      <li key={i}>{e}</li>
      );
    });

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
          <form className={form.loginForm} onSubmit = {(e) => this.formSubmit(e)}>
          <h1>Edit {this.state.siteName}</h1>
            <input className={form.textInput} type='text' name='siteName' onChange = {(e)=>{this.inputChange(e)}} value={this.state.siteName}/>
            <textarea className={form.textBox} type='text' name='siteDesc' onChange = {(e)=>{this.inputChange(e)}} value={this.state.siteDesc}/>
            <input className={form.textInput} type='text' name='siteImage' onChange = {(e)=>{this.inputChange(e)}} value={this.state.siteImage}/>
            <Tags handleChange={this.handleTags} onMount={this.props.site.tags}/>
            <button className={form.btnPrimary}>Confirm Changes</button>
          </form>
          <button onClick={() => this.editCancel()}>Cancel</button>
        </div>
    )

    let ownerBar = 
    (
      this.props.site.isOwner ? (
        <div>
          <button className={form.btnSecondary} onClick={() => this.editControl()}>
            Edit
          </button>
          <button className={form.btnSecondary} onClick={() => this.deleteSite(this.props.site.site_id)}>
            Delete
          </button>
        </div>
      ) : (
        ''
      ))

    let siteContent = 
    (
        <div>
          <header className={`container ${site.header}`}>
            <div className={site.imageOverlay}/>
            <img className={site.image} src= {this.props.site.image_link} alt={this.props.site.site_name}/>
            <div className={site.headline}>
              <div>
              <h2>{this.props.site.site_name}</h2>
              {ownerBar}
              </div>
              <div className={site.starsWrapper}>
                <Stars average_score={this.props.site.average_score}/>
              </div>
            </div>
            <img className={site.divider} src={DividerLight} alt=''/>
          </header>
          <main className={`container ${site.main}`}>

            <h3>Plant Care</h3>
            <div className={`${site.about} container-sm`}>
              <p>{this.props.site.description}</p>
              <ul className={site.list}>
                {tagsFormat}
              </ul>
              <div className={site.buttons}>
                <p className= {site.price}>£19.90</p>
                <a className= {form.btnPrimary} href='https://www.google.com/'>Order Now</a>
              </div>
          </div>

          <h3>Comments</h3>
          {commentFormat}
          <NewComment siteID={this.props.site.site_id}/>
        </main>
        </div>
    )

    if(this.state.edit){
      return editDisplay
    }
    
    return (
      <div>
        {siteContent}
      </div>
    );
  }return(<h1>loading</h1>)
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
