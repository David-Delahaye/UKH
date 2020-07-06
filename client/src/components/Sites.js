import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites, getSite} from '../actions/siteActions'
import PropTypes from 'prop-types';


class Sites extends Component {
    constructor(){
      super();
      this.state = {
        redirect:false,
      }
    }

    componentDidMount(){
      this.props.fetchSites();
    }

    gotoSite = async (e,i) => {
      this.setState({redirect:e.site_id})
      await this.props.getSite(e);
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

  Sites.propTypes = {
    sites : PropTypes.array.isRequired,
    fetchSites : PropTypes.func.isRequired,
    getSite : PropTypes.func.isRequired,
  }
  
  const mapStateToProps = state => ({
    sites: state.sites.items
  })

  export default connect(mapStateToProps, {fetchSites, getSite})(Sites);