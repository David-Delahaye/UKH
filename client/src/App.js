import React, { Component } from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';

class Sites extends Component {
  constructor(){
    super();
    this.state = {
      redirect:false,
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

  deleteSite = async (e,i) => {
    const newSites = this.state.sites.slice();
    newSites.splice(i,1);
    console.log(newSites);
    this.setState({sites:newSites});
    console.log(this.state.sites);  
    try {
      const id = e.site_id;
      console.log(id);
      const response = await fetch(`/api/sites/${id}`,{
        method: "DELETE",
        headers: { "Content-Type" : "application/json"},
      });
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
        <button onClick = {() => this.deleteSite(e,i)}>Delete</button>
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
      redirect:false,
      inputs:{
        title:'',
        description:''
      },
    }    
  }

  formSubmit = async (e) => {
    e.preventDefault()
    try {
        const title = e.target.title.value;
        const desc = e.target.desc.value;
        const body = {"siteName":title, "siteDesc":desc}
        const response = await fetch("/api/sites",{
          method: "POST",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify(body)
        });
        this.setState({redirect:true})
    } catch (err) {
      console.error(err.message);
    }
   
  }

  render(){
    if (this.state.redirect === true){
      return<Redirect to ="/index"/>
    }
    return(
      <form onSubmit = {(e) =>{this.formSubmit(e)}}>
        <input type='text' name ='title' placeholder='add a site'/>
        <input type='text' name ='desc' placeholder='description'/>
        <button>Add</button>
      </form>
    )
  }
}

export default {Sites, NewSite};
