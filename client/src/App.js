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

export default Sites;
