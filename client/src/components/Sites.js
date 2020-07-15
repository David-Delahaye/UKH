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
      console.log(queryParams);
      
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
      console.log(e.target.value);
      const splitted = e.target.value.split(" ");
      let order;
      let direction;
      console.log(splitted[0] === 'Rating');
      if (splitted[0] === 'Rating'){
        order = 'average_score'
      }else if (splitted[0] === 'Newest'){
        order = 'created_on'
      }else if (splitted[0] === 'Alphabetical'){
        order = 'site_name'
      }
      if (splitted[1] === '(ASC)'){
        direction = 'ASC'
      }else if (splitted[1] === '(DESC)'){
        direction = 'DESC'
      }

      console.log(order);
      console.log(direction);
      
      

      await this.setState({order:order});
      await this.setState({direction:direction});
      this.formSubmit(e);
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
          <h5>Displaying {this.props.sites.length} Result(s)</h5>
          <select onChange ={(e) => {this.orderChange(e)}}>
            <option>Rating (ASC)</option>
            <option>Rating (DESC)</option>
            <option>Newest (ASC)</option>
            <option>Newest (DESC)</option>
            <option>Alphabetical (ASC)</option>
            <option>Alphabetical (DESC)</option>
          </select>
          <h5>Order By Rating (Asc)</h5>
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