import {FETCH_SITES, SEARCH_SITES, GET_SITE, FETCH_SITE, NEW_SITE, DELETE_SITE, UPDATE_SITE, NEW_MESSAGE} from './types'

export const fetchSites = () => async dispatch => {
    const response = await fetch('/api/sites');
    const jsonData = await response.json();
    dispatch({
        type: FETCH_SITES,
        payload: jsonData
    })
}

export const searchSites = (queryParams) => async dispatch => {
    console.log(queryParams);
    const query = `?name=${queryParams.name}&tags=${queryParams.tags}`;
    console.log(query);
    
    const response = await fetch('/api/sites'+ query);
    const jsonData = await response.json();
    dispatch({
        type: SEARCH_SITES,
        payload: jsonData
    })
}


export const getSite = (site) => async dispatch => {
    dispatch({
        type: GET_SITE,
        payload: site
    })
}

export const fetchSite = (siteID) => async dispatch => {
    const response = await fetch(`/api/sites/${siteID}`, {
        headers: {
        accepts: "application/json",
        },
    });
    const jsonData = await response.json();
    dispatch({
        type: FETCH_SITE,
        payload: jsonData
    })
}

export const newSite = (siteData) => async dispatch => {
    //UPDATE DB
    const message = await fetch("/api/sites",{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(siteData)
    });

    //UPDATE MESSAGE
    const jsonMessage = await message.json();
    dispatch({
        type: NEW_MESSAGE,
        payload: jsonMessage.message
    })

    //UPDATE SITES
    const response = await fetch('/api/sites');
    const jsonData = await response.json();
    dispatch({
        type: NEW_SITE,
        payload: jsonData
    })
}

export const deleteSite = (siteID) => async dispatch => {
    //UPDATE DB
    const message = await fetch(`/api/sites/${siteID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })

    //UPDATE MESSAGE
    const jsonMessage = await message.json();
    
    dispatch({
        type: NEW_MESSAGE,
        payload: jsonMessage.message
    })

    //UPDATE SITES
    const response = await fetch(`/api/sites/`);
    const jsonData = await response.json();
    dispatch({
        type: DELETE_SITE,
        payload: jsonData
    })
}

export const updateSite = (siteID, e) => async dispatch => {
    //UPDATE DB
    const siteName = e.target.siteName.value;
    const siteDesc = e.target.siteDesc.value;
    const body = {siteName, siteDesc}
    const message = await fetch(`/api/sites/${siteID}`,{
        method: "PUT",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(body)
    });

    //UPDATE SITE
    const response = await fetch(`/api/sites/${siteID}`);
    const jsonData = await response.json();
    dispatch({
        type: UPDATE_SITE,
        payload: jsonData
    })

    //UPDATE MESSAGE
    const jsonMessage = await message.json();
    dispatch({
        type: NEW_MESSAGE,
        payload: jsonMessage.message
    })
}
