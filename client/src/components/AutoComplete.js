import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites, searchSites, getSite} from '../actions/siteActions'
import PropTypes from 'prop-types';

class Autocomplete extends Component{
    constructor(props){
        super(props);
        this.state = {
            input:'',
            items:[]
        }
    }

    renderOption = (plant) => {
        return plant.site_name;
    }

    inputValue = (plant) => {
        return plant.site_name;
    }

    fetchData = async (search) => {
        const response = await fetch(`/api/sites?name=${search}`);
        const jsonData = await response.json();
        if(response.error){
            return[];
        }
        return(jsonData);
    }

    onInput = async (value) => {
        console.log('here');
        console.log(value);
        if (value){
            const items = await this.fetchData(value);
            console.log(items);
            this.setState({items})
        } else{
            this.setState({items:[]})
        }
    };

    debounce = (value) => {
        console.log(value);
        this.setState({input:value})
        setTimeout(async () => {
          if (this.state.input === value){
              this.onInput(value)
          }
        }, 400);
      }


    render(){
        let renderResults = this.state.items.map ((e,i) => {
            return (
                <Link to={'/sites/'+ e.site_id} key={i}>
                    <li>{e.site_name}</li>
                </Link>

            )
        }) 
        return(
            <div>
                <label>Search</label>
                <input onInput={(e) => {this.debounce(e.target.value)}} class="input" value={this.state.input}/>
                <div class="dropdown">
                    <div class="dropdown-menu">
                        <div class ="dropdown-content results">
                            {renderResults}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(null, {fetchSites, searchSites, getSite})(Autocomplete);