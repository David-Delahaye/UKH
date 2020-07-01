import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';

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
          console.log(response);
          
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

  export default NewSite;