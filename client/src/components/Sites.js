import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites} from '../actions/siteActions'


class Sites extends Component {
    constructor(){
      super();
      this.state = {
        redirect:false,
      }
    }

    componentWillMount(){
      this.props.fetchSites();
    }
  
    componentDidMount(){
      this.getSites();
    }
  
    getSites = async () => {
    }
  
    gotoSite = async (e,i) => {
      this.setState({redirect:e.site_id})
    }
  
    render(){
      if (this.state.redirect){
        const id = this.state.redirect;
        return<Redirect to = {'/sites/'+ id}/>
      }
  
      let siteFormat = this.props.sites.map ((e,i) => {
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

  const mapStateToProps = state => ({
    sites: state.sites.items
  })

  export default connect(mapStateToProps, {fetchSites})(Sites);