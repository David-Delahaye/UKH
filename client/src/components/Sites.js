import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites, searchSites, getSite} from '../actions/siteActions'
import PropTypes from 'prop-types';
import Autocomplete from './AutoComplete';
import form from "../modules/form/form.module.css";
import sites from "../modules/sites/sites.module.css";
import Stars from "./Stars";
import Divider from "../images/DividerLight.png"



class Sites extends Component {
    componentDidMount(){
      this.props.fetchSites();
    }

    gotoSite = async (e,i) => {
      this.props.history.push('/sites/'+ e.site_id)
    }

    formSubmit = async (e) => {
      e.preventDefault()
      const queryParams = {
        name: e.target.name.value,
        tags: e.target.tags.value
      }
      this.props.searchSites(queryParams)
    }
  
    render(){
    let siteFormat = this.props.sites.map ((e,i) => {
      return(
        <Link to={'/sites/'+ e.site_id} className = {sites.card} key={i}>
          <div className = {sites.cardImg}/>
          <h3 className = {sites.cardTitle}>{e.site_name}</h3>
          <p className = {sites.cardDesc}>{e.description}</p>
          <div className = {sites.cardInfoBar}>
            <div className = {sites.cardScoreWrapper}>
            <Stars average_score={e.average_score}/>
            </div>
            <div className = {sites.cardPrice}>
               ~ £20
            </div>
          </div>
        </Link>
      )
    })

    return(
      <div>
        <header className={`container ${sites.header}`}>
          <div className={sites.headline}>
            <h2>Search Plants </h2>
          </div>
          <form onSubmit={(e) => {this.formSubmit(e)}} className={form.search}>
            <Autocomplete/>
            <input className ={form.textInput} name='name' type='text' placeholder='Search by Name'/>
            <div>
              <input className ={form.textInput} name='tags' type='text' placeholder='Search by Tags'/>
              <button className={form.btnPrimary}>Search</button>
            </div>
          </form>
          <img className={sites.divider} src={Divider}/>
        </header>
        <main className='container'>
          <h5>Displaying {this.props.sites.length} Result(s)</h5>
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
    searchSites : PropTypes.func.isRequired,
    getSite : PropTypes.func.isRequired,
  }
  
  const mapStateToProps = state => ({
    sites: state.sites.items
  })

  export default connect(mapStateToProps, {fetchSites, searchSites, getSite})(Sites);