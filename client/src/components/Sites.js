import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites, getSite} from '../actions/siteActions'
import PropTypes from 'prop-types';
import form from "../modules/form/form.module.css";
import sites from "../modules/sites/sites.module.css";


class Sites extends Component {
    componentDidMount(){
      this.props.fetchSites();
    }

    gotoSite = async (e,i) => {
      this.props.history.push('/sites/'+ e.site_id)
      await this.props.getSite(e);
    }
  
    render(){
    let siteFormat = this.props.sites.map ((e,i) => {
      return(
        <div className = {sites.card} key={i}>
          <div className = {sites.cardImg}/>
          <h3>{e.site_name}</h3>
          <p>{e.description}</p>
          <button onClick = {() => this.gotoSite(e,i)}>See more</button>
        </div>
      )
    })
  
    return(
      <div>
        <header className='container'>
          <h2>Campgrounds</h2>
          <form className={form.search}>
            <input className ={form.textInput} type='text' placeholder='Search by Name'/>
            <div>
              <input className ={form.textInput} type='text' placeholder='Search by Location'/>
              <button className={form.btnPrimary}>Search</button>
            </div>
          </form>
          <img className={sites.divider} src='Divider.png'/>
        </header>
        <main className='container'>
          <div className={sites.grid}>
          {siteFormat}
          </div>
        </main>
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