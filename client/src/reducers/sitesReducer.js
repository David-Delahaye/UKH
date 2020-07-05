import {FETCH_SITES, NEW_SITE, DELETE_SITE} from '../actions/types';
import { bindActionCreators } from 'redux';

const initialState = {
    items:[],
    item:{}
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_SITES:
            return {
                ...state,
                items:action.payload
            };
        case NEW_SITE:
            return {
                ...state,
                items:action.payload
            };
        case DELETE_SITE:
            console.log('at the reducer');
            return {
                ...state,
                items:action.payload
            };
        default:
            return state;
    }
}