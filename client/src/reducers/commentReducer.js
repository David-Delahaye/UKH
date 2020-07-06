import { bindActionCreators } from 'redux';
import {RESET_COMMENTS ,NEW_COMMENT, FETCH_COMMENTS, DELETE_COMMENT} from '../actions/types';

const initialState = {
    items:[]
}

export default function(state = initialState, action){
    switch(action.type){
        case RESET_COMMENTS:
            return {
                ...state,
                items:action.payload
            };
        case NEW_COMMENT:
            return {
                ...state,
                items:action.payload
            };
        case DELETE_COMMENT:
            return {
                ...state,
                items:action.payload
            };
        case FETCH_COMMENTS:
            return {
                ...state,
                items:action.payload
            };
        default:
            return state;
    }
}