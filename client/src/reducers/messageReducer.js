import { bindActionCreators } from 'redux';
import {NEW_MESSAGE} from '../actions/types';

const initialState = {
    items:[],
    item:{}
}

export default function(state = initialState, action){
    switch(action.type){
        case NEW_MESSAGE:
            return {
                ...state,
                item:action.payload
            }
        default:
            return state;
    }
}