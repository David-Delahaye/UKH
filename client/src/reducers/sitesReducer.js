import {FETCH_SITES, NEW_SEARCH, SEARCH_SITES, NEW_SITE, DELETE_SITE, FETCH_SITE, GET_SITE, UPDATE_SITE} from '../actions/types';

const initialState = {
    items:[],
    item:{},
    search:{}
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_SITES:
            return {
                ...state,
                items:action.payload
            };
        case NEW_SEARCH:
            return {
                ...state,
                search:action.payload
            };
        case SEARCH_SITES:
            return {
                ...state,
                items:action.payload
            };
        case FETCH_SITE:
            return{
                ...state,
                item:action.payload
            }
        case GET_SITE:
            return{
                ...state,
                item:action.payload
            }
        case NEW_SITE:
            return {
                ...state,
                items:action.payload
            };
        case DELETE_SITE:
            return {
                ...state,
                items:action.payload
            };
        case UPDATE_SITE:
            return {
                ...state,
                item:action.payload
            };
        default:
            return state;
    }
}