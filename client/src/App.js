import React, { Component } from 'react';
import './App.css';
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
      console.log(response);
      const jsonData = await response.json();
      await console.log(jsonData);
      this.setState({sites:jsonData});
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

class Site extends Component {
  constructor(){
    super()
    this.state = {
      id: '',
      info:{},
      redirect:false
    };
  }

  componentDidMount(){
    this.setState({id:this.props.match.params.site})
    this.getSite();
  }

  getSite = async () => {
    try {
      await this.setState({id:this.props.match.params.site})
      const response = await fetch(`/api/sites/${this.state.id}`, {
        headers:{
            "accepts":"application/json"
        }
    });
      const jsonData = await response.json();
      this.setState({info:jsonData[0]});
    } catch (err) {
      console.error(err.message);
    }
  }

  deleteSite = async (e,i) => {
    try {
      const id = this.state.id;
      console.log(id);
      const response = await fetch(`/api/sites/${id}`,{
        method: "DELETE",
        headers: { "Content-Type" : "application/json"},
      })
      .then(this.setState({redirect:'/index'}))
    } catch (err) {
      console.error(err.message);
    }
  }

  render(){
    if (this.state.redirect){
      return(<Redirect to ={this.state.redirect}/>)
    }
    return(
      <div>
        <h4>id: {this.state.info.site_id}</h4>
        <h1>{this.state.info.site_name}</h1>
        <p>{this.state.info.description}</p>
        <button onClick = {() => this.deleteSite()}>Delete</button>
      </div>
    )
  }
}

class Nav extends Component {
render(){
  return(
    <nav>
      <h1>UKC</h1>
      <Link to="/index">All sites</Link>
      <Link to="/new">Add site</Link>
    </nav>
  )
}
}


export default {Site, Sites, NewSite, Nav};
