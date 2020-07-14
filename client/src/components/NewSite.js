import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newSite} from '../actions/siteActions';

class NewSite extends Component {
    constructor(){
      super();
      this.state = {
        redirect:false,
        title:'',
        description:'',
        tags:[]
      }    
    }

    addTag = (e) => {
      e.preventDefault()
      const tags = this.state.tags.slice();
      const newTags = tags.push(e.target.tag.value);
     this.setState({ tags: tags});
    };
  
    formSubmit = async (e) => {
      e.preventDefault()
      const title = e.target.title.value;
      const desc = e.target.desc.value;
      const tags = this.state.tags;

      const body = {"siteName":title, "siteDesc":desc, "siteTags":tags}
      await this.props.newSite(body);
      this.setState({redirect:true})
    }
  
    render(){
      let tagFormat = this.state.tags.map((e, i) => {
        return (
        <li key={i}>{e}</li>
        );
      });

      if (this.state.redirect === true){
        return<Redirect to ="/index"/>
      }
      return(
        <div>
        <form onSubmit = {(e) =>{this.formSubmit(e)}}>
          <input type='text' name ='title' placeholder='add a site' required/>
          <input type='text' name ='desc' placeholder='description' required/>
          <button>Add</button>
        </form>
        <form onSubmit = {(e) =>{this.addTag(e)}}>
          <input type='text' name ='tag' placeholder='tags' required/>
          <button>Add Tag</button>
        </form>
        {tagFormat}
        </div>
      )
    }
  }

  NewSite.propTypes = {
    newSite : PropTypes.func.isRequired
  }
  
  export default connect(null, {newSite})(NewSite);