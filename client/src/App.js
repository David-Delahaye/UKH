import React, { Component } from 'react';
import './App.css';

class Sites extends Component {
  constructor(){
    super();
    this.state = {
      sites:[]
    }
  }

  componentDidMount(){
    this.getSites();
  }

  getSites = async () => {
    try {
      const response = await fetch('/api/sites', {
        headers:{
            "accepts":"application/json"
        }
    });
      console.log(response);
      const jsonData = await response.json();
      await console.log(jsonData);
      this.setState({sites:jsonData});
    } catch (err) {
      console.error(err.message);
    }
  }

  render(){
    let siteFormat = this.state.sites.map ((e,i) => {
      return(
        <div key={i}>
        <h3>{e.site_name}</h3>
        <p>{e.description}</p>
        </div>
      )
    })

    return(
      <div>
      <h1>COMPONENT</h1>
      {siteFormat}
      </div>
    )
  }
}

class NewSite extends Component {
  constructor(){
    super();
    this.state = {

    }    
  }

  formSubmit = async (e) => {
    e.preventDefault()
    console.log('all connected nice');
    console.log(e);
    console.log(e.title);
  }

  inputChange = async (e) => {
    console.log(e.target.value);
    
  }

  render(){
    return(
      <form onSubmit = {(e) =>{this.formSubmit(e)}}>
        <input onChange = {(e) =>{this.inputChange(e)}}type='text' name ='title' placeholder='add a site'/>
        <input type='text' name ='desc' placeholder='description'/>
        <button>Add</button>
      </form>
    )
  }
}

export default {Sites, NewSite};
