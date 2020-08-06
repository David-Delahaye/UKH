import React, { Component } from 'react';
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
  
    formSubmit = async (e) => {
      e.preventDefault()
      const title = e.target.title.value;
      const desc = e.target.desc.value;
      const img = e.target.image.value;
      const link = e.target.link.value;
      const price = e.target.price.value;
      const tags = this.state.tags;
      
      const body = {"siteName":title, "siteDesc":desc, "siteTags":tags, "siteImage":img, "siteLink":link, "sitePrice":price}
      await this.props.newSite(body);
      this.props.history.push('/sites')
    }
  
    render(){

      return(
        <form
        className={form.loginForm}
          onSubmit={(e) => {
            this.formSubmit(e);
          }}
        >
          <div className={form.innerLoginForm}>
          <h1>Add Plant</h1>
          <input className={form.textInput} type="text" name="title" placeholder="Plant Name" />
          <textarea className={form.textBox} type="text" name="desc" placeholder="Plant Description" />
          <input className={form.textInput} type="text" name="image" placeholder="Plant Image Link"/>
          <input className={form.textInput} type="text" name="link" placeholder="Plant Purchase Link"/>
          <input className={form.textInput} type="number" name="price" placeholder="Plant Price"/>
          <Tags handleChange={this.handleTags}/>
          <button className={form.btnPrimary}>Submit</button>
          </div>
        </form>
      )
    }
  }

  NewSite.propTypes = {
    newSite : PropTypes.func.isRequired
  }
  
  export default connect(null, {newSite})(NewSite);