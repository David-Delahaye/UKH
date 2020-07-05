import {combineReducers} from 'redux';
import authReducer from './authReducer';
import sitesReducer from './sitesReducer';
import messageReducer from './messageReducer'

export default combineReducers({
    sites: sitesReducer,
    auth: authReducer,
    messages:  messageReducer
})