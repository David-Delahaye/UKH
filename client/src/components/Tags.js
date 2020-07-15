import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSites, searchSites, getSite} from '../actions/siteActions'
import PropTypes from 'prop-types';
import form from '../modules/form/form.module.css'

class Tags extends Component{
    constructor(props){
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            loaded:false,
            closed:true,
            input:'',
            checked:[],
            tags:['green', 'tall', 'big', 'nice', 'tag']
        }
    }

    async componentDidMount() {
        const tags = await this.props.search.tags ? this.props.search.tags : [];
        await this.setState({checked:tags})
        await this.setState({input:tags})
        
        document.addEventListener('mousedown', this.handleClickOutside);
        this.setState({loaded:true})
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            this.setState({closed:true})
        }
    }

    checkBox = async (e) => {
        if(e.target.checked){
        const prevTags = this.state.checked.slice();
        prevTags.push(e.target.name);
        await this.setState({checked:prevTags})
        }else{
        let prevTags = this.state.checked.slice();
        prevTags = prevTags.filter(f => f !== e.target.name);
        await this.setState({checked:prevTags})
        }
        this.updateInput()
    }

    updateInput = () => {
        this.setState({input:this.state.checked})
        this.props.handleChange(this.state.checked)
    }

    render(){
        let renderResults = this.state.tags.map ((e,i) => {
            const isChecked = this.state.checked.includes(e);
            return (
                <label className={form.tagsItem} key = {i}>
                    {e}
                <input onChange={(e) =>{this.checkBox(e)}} name={e} type='checkbox' checked={isChecked}/>
                </label>
            )
        })

        if(this.state.closed){
            return <input ref={this.wrapperRef} onClick ={() => {this.setState({closed:false})}} className ={form.textInput} value={this.state.input}  name='tags' type='text' placeholder='Search by Tags' autoComplete='Off' />
        }
        return(
            <div ref={this.wrapperRef} className={form.tags}>
                <input className ={form.tagsList} value={this.state.input}  name='tags' type='text' placeholder='Search by Tags' autoComplete='Off'/>
                <div className={form.tagsWrapper}>
                    <div className={form.tagsContent}>
                        {renderResults}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sites: state.sites.items,
    search: state.sites.search
  })

export default connect(mapStateToProps, {fetchSites, searchSites, getSite})(Tags);