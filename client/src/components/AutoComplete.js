import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites, searchSites, getSite} from '../actions/siteActions'
import PropTypes from 'prop-types';
import form from '../modules/form/form.module.css'


class Autocomplete extends Component{
    constructor(props){
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            input:'',
            items:[],
            closed:true
        }
    }

    componentDidMount() {
        this.setState({input:this.props.onMount})
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            this.setState({closed:true})
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
        const five = jsonData.slice(0,5)
        if(response.error){
            return[];
        }
        return(five);
    }

    onInput = async (value) => {
        this.props.handleChange(value)
        this.setState({closed:false})
        if (value){
            const items = await this.fetchData(value);
            this.setState({items})
        } else{
            this.setState({items:[]})
        }
    };

    debounce = (value) => {
        this.setState({input:value})
        setTimeout(async () => {
          if (this.state.input === value){
              this.onInput(value)
          }
        }, 400);
      }

    setInput = (value) => {
        this.setState({input:value});
        this.props.handleChange(value)
        this.setState({closed:true});
    }


    render(){
        let renderResults = this.state.items.map ((e,i) => {
            return (
                <li key={i} onClick={() => this.setInput(e.site_name)} className={form.dropdownItem}>
                    {e.site_name}
                </li>
            )
        })
        if (this.state.items.length !== 0 && this.state.closed === false){
        return(
            <div ref={this.wrapperRef} className={form.dropdown}>
                <input onChange={(e) => {this.debounce(e.target.value)}} className={form.dropdownInput} value={this.state.input} name='name' placeholder='Search by Name' autoComplete='Off' />
                <div className={form.dropdownWrapper}>
                    <div className={form.dropdownContent}>
                        {renderResults}
                    </div>
                </div>
            </div>
        )}else {
            return(
                <div ref={this.wrapperRef} className={form.dropdown}>
                <input onChange={(e) => {this.debounce(e.target.value)}} className={form.textInput} value={this.state.input} name='name' placeholder='Search by Name' autoComplete='Off' />
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    sites: state.sites.items,
    search: state.sites.search
  })

export default connect(mapStateToProps, {fetchSites, searchSites, getSite})(Autocomplete);