import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { render } from 'react-dom';


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
        this.setState({info:jsonData});
      } catch (err) {
        console.error(err.message);
      }
    }
  
    deleteSite = async (e,i) => {
      try {
        const id = this.state.id;
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
          <h4>owner: {this.state.info.owner}</h4>
          <h1>{this.state.info.site_name}</h1>
          <p>{this.state.info.description}</p>
          <button onClick = {() => this.deleteSite()}>Delete</button>
        </div>
      )
    }
  }
  

export default Site;