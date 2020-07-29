import React, { Component } from "react";
import {Link} from "react-router-dom"
import form from "../modules/form/form.module.css";

class Landing extends Component {

  render() {
    return (
        <div className='container'>
            <h1>UK Houseplants</h1>
            <h4>Adventure lies around every corner, and down every avenue.</h4>
            <div className={form.btnGroup}>
                <Link to='/sites' className={form.btnPrimary}>Best Plants</Link>
            </div>
            <img className='back' src ='https://images.unsplash.com/photo-1496753191511-bbb055f5d304?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' alt=''/>
        </div>
    );
  }
}

export default Landing;
