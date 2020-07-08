import React, { Component } from 'react';
import { Link} from 'react-router-dom';
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
    }

    calcScore = (e) => {
      const posMove = -20 * (Math.floor((10 - e.average_score)/2));
      if(e.average_score == null){
        return ''
      }
      if (e.average_score % 2 === 0){
        return (<img className = {sites.cardScore} style={{left:posMove + '%'}} src='FullStars.png'/>)
      }else{
        return (<img className = {sites.cardScore} style={{left:posMove + '%'}} src='HalfStars.png'/>)
      }
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
              {this.calcScore(e)}
            </div>
            <div className = {sites.cardPrice}>
              £20.50 / Night
            </div>
          </div>
        </Link>
      )
    })
  
    return(
      <div>
        <header className='container'>
          <div className={sites.headline}>
            <h2>Campgrounds</h2>
            <img className={sites.icon} src='Fire.png'/>
          </div>
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