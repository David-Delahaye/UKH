import {FETCH_SITES, NEW_SITE} from './types'
import { json } from 'body-parser';

export const fetchSites = () => async dispatch => {
        const response = await fetch('/api/sites');
        const jsonData = await response.json();
        dispatch({
            type: FETCH_SITES,
            payload: jsonData
        })
        // if (response.status === 200) {
        //     this.setState({sites:jsonData});
        // }else{
        //     console.error(jsonData);
        // }

}