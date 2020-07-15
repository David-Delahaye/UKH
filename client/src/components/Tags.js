import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites, searchSites, getSite} from '../actions/siteActions'
import PropTypes from 'prop-types';
import form from '../modules/form/form.module.css'

class Tags extends Component{
    constructor(props){
        super(props);
        this.state = {
            closed:true,
            input:'',
            tags:['green', 'tall', 'big', 'nice']
        }
    }

    render(){
        let renderResults = this.state.tags.map ((e,i) => {
            return (
                <label className={form.tagsItem} key = {i}>
                    {e}
                <input type='checkbox'/>
                </label>
            )
        })

        if(this.state.closed){
            return <input onClick ={() => this.setState({closed:false})} className ={form.tagsList} value={this.state.input}  name='tags' type='text' placeholder='Search by Tags' disabled='true'/>
        }
        return(
            <div className={form.tags}>
                <input className ={form.tagsList} value={this.state.input}  name='tags' type='text' placeholder='Search by Tags' disabled='true'/>
                <div className={form.tagsWrapper}>
                    <div className={form.tagsContent}>
                        {renderResults}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {fetchSites, searchSites, getSite})(Tags);