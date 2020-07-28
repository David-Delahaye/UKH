import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newSite} from '../actions/siteActions';
import form from "../modules/form/form.module.css";
import Tags from './Tags';

class NewSite extends Component {
    constructor(){
      super();
      this.state = {
        title:'',
        description:'',
        tags:[]
      }    
    }

    handleTags = async (e) => {
      this.setState({tags:e})   
    }
    
    // addTag = (e) => {
    //   e.preventDefault()
    //   const tags = this.state.tags.slice();
    //   const newTags = tags.push(e.target.tag.value);
    //  this.setState({ tags: tags});
    // };
  
    formSubmit = async (e) => {
      e.preventDefault()
      const title = e.target.title.value;
      const desc = e.target.desc.value;
      const tags = this.state.tags;

      const body = {"siteName":title, "siteDesc":desc, "siteTags":tags}
      await this.props.newSite(body);
      this.props.history.push('/sites')
    }
  
    render(){
      let tagFormat = this.state.tags.map((e, i) => {
        return (
        <li key={i}>{e}</li>
        );
      });

      return(
        <form
        className={form.loginForm}
          onSubmit={(e) => {
            this.formSubmit(e);
          }}
        >
          <h1>Add Plant</h1>
          <input className={form.textInput} type="text" name="title" placeholder="Plant Name" />
          <textarea className={form.textBox} type="text" name="desc" placeholder="Plant Description" />
          <Tags handleChange={this.handleTags}/>
          <button className={form.btnPrimary}>Submit</button>
        </form>

        // <div>
        // <form onSubmit = {(e) =>{this.formSubmit(e)}}>
        //   <input type='text' name ='title' placeholder='add a site' required/>
        //   <input type='text' name ='desc' placeholder='description' required/>
        //   <button>Add</button>
        // </form>
        // <form onSubmit = {(e) =>{this.addTag(e)}}>
        //   <input type='text' name ='tag' placeholder='tags' required/>
        //   <button>Add Tag</button>
        // </form>
        // {tagFormat}
        // </div>
      )
    }
  }

  NewSite.propTypes = {
    newSite : PropTypes.func.isRequired
  }
  
  export default connect(null, {newSite})(NewSite);