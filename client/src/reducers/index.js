import {combineReducers} from 'redux';
import authReducer from './authReducer';
import sitesReducer from './sitesReducer';
import messageReducer from './messageReducer';
import commentReducer from './commentReducer';

export default combineReducers({
    sites: sitesReducer,
    auth: authReducer,
    messages: messageReducer,
    comments: commentReducer
})