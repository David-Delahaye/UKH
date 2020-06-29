import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { render } from 'react-dom';


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
      const jsonData = await response.json();
      if (response.status === 200) {
        this.setState({sites:jsonData});
      }else{
        console.error(jsonData);
      }


      } catch (err) {
        console.error(err.message);
      }
    }
  
    gotoSite = async (e,i) => {
      this.setState({redirect:e.site_id})
    }
  
    render(){
      if (this.state.redirect){
        const id = this.state.redirect;
        return<Redirect to = {'/sites/'+ id}/>
      }
  
      let siteFormat = this.state.sites.map ((e,i) => {
        return(
          <div key={i}>
          <h3>{e.site_name}</h3>
          <p>{e.description}</p>
          <button onClick = {() => this.gotoSite(e,i)}>See more</button>
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

  export default Sites;