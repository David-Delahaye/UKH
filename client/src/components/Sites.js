import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites, newSearch, searchSites, getSite} from '../actions/siteActions'
import PropTypes from 'prop-types';
import Autocomplete from './AutoComplete';
import Tags from './Tags'
import form from "../modules/form/form.module.css";
import sites from "../modules/sites/sites.module.css";
import Stars from "./Stars";
import Divider from "../images/DividerLight.png"



class Sites extends Component {
  constructor(props){
    super(props);
    this.state = {
      name:this.props.search.name ? this.props.search.name: '',
      tags:this.props.search.tags ? this.props.search.tags: [],
      order: this.props.search.order,
      direction: this.props.search.direction
    }
  }
    componentDidMount(){
      if (Object.keys(this.props.search).length !== 0){
        this.props.searchSites(this.props.search);
      }else{
        this.props.fetchSites();
      }
    }

    gotoSite = async (e,i) => {
      this.props.history.push('/sites/'+ e.site_id)
    }

    formSubmit = async (e) => {
      e.preventDefault()
      const queryParams = {
        name: this.state.name,
        tags: this.state.tags,
        order: this.state.order,
        direction: this.state.direction,
      }
      this.props.newSearch(queryParams);
      this.props.searchSites(queryParams);
    }

    handleTags = async (e) => {
      this.setState({tags:e})   
    }

    handleName = async (e) => {
      this.setState({name:e})
    }

    orderChange = async (e) => {
      const value = e.target.value;
      const split = value.split(' ')

      let order = split[0];
      let direction = split[1];
      

      await this.setState({order:order});
      await this.setState({direction:direction});
      const queryParams = {
        name: this.state.name,
        tags: this.state.tags,
        order: this.state.order,
        direction: this.state.direction,
      }
      this.props.newSearch(queryParams);
      this.props.searchSites(queryParams);
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
            <Autocomplete  handleChange={this.handleName} onMount={this.props.search.name}/>
            <div>
              <Tags handleChange={this.handleTags} onMount={this.props.search.tags}/>
              <button className={form.btnPrimary}>Search</button>
            </div>
          </form>
          <img className={sites.divider} src={Divider}/>
        </header>
        <main className='container'>
          <div className={form.sortBar}>
            <h5>Displaying {this.props.sites.length} Result(s)</h5>
            <select onChange ={(e) => {this.orderChange(e)}}>
              <option value='average_score DESC'>Rating, High to low</option>
              <option value='average_score ASC'>Rating, Low to High</option>
              <option value='created_on DESC'>Newest First</option>
              <option value='created_on ASC'>Oldest First</option>
              <option value='site_name ASC'>Alphabetically, A-Z</option>
              <option value='site_name DESC'>Alphabetically, Z-A</option>
            </select>
          </div>
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
    newSearch : PropTypes.func.isRequired,
    searchSites : PropTypes.func.isRequired,
    getSite : PropTypes.func.isRequired,
  }
  
  const mapStateToProps = state => ({
    sites: state.sites.items,
    search: state.sites.search
  })

  export default connect(mapStateToProps, {fetchSites, newSearch, searchSites, getSite})(Sites);