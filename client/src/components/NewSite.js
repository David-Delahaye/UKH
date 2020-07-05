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
        inputs:{
          title:'',
          description:''
        },
      }    
    }
  
    formSubmit = async (e) => {
      e.preventDefault()
      const title = e.target.title.value;
      const desc = e.target.desc.value;
      const body = {"siteName":title, "siteDesc":desc}
      await this.props.newSite(body);
      this.setState({redirect:true})
    }
  
    render(){
      if (this.state.redirect === true){
        return<Redirect to ="/index"/>
      }
      return(
        <form onSubmit = {(e) =>{this.formSubmit(e)}}>
          <input type='text' name ='title' placeholder='add a site' required/>
          <input type='text' name ='desc' placeholder='description' required/>
          <button>Add</button>
        </form>
      )
    }
  }

  NewSite.propTypes = {
    newSite : PropTypes.func.isRequired
  }
  
  export default connect(null, {newSite})(NewSite);