import {combineReducers} from 'redux';
import authReducer from './authReducer';
import sitesReducer from './sitesReducer';

export default combineReducers({
    sites: sitesReducer,
    auth: authReducer
})