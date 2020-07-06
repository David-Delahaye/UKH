import { bindActionCreators } from 'redux';
import {LOGIN_USER, LOGOUT_USER, FETCH_USER} from '../actions/types';

const initialState = {
    user:{}
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                user:action.payload
            };
        case LOGOUT_USER:
            return{
                ...state,
                user:action.payload
            }
        case FETCH_USER:
            return{
                ...state,
                user:action.payload
            }
        default:
            return state;
    }
}