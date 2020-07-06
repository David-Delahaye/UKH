import {NEW_COMMENT, FETCH_COMMENTS, NEW_MESSAGE, RESET_COMMENTS, DELETE_COMMENT} from './types'

export const resetComments = () => async dispatch => {
    dispatch({
        type: RESET_COMMENTS,
        payload: []
    })
}

export const fetchComments = (siteID) => async dispatch => {
    const response = await fetch(`/api/sites/${siteID}/comments/`);
    const jsonData = await response.json();
    dispatch({
        type: FETCH_COMMENTS,
        payload: jsonData
    })
}

export const newComment = (e, siteID) => async dispatch => {
    //UPDATE DB
    const commentTitle = e.target.commentTitle.value;
    const commentDesc = e.target.commentDesc.value;
    const commentScore = e.target.commentScore.value;
    const body = {commentDesc, commentTitle, commentScore}
    const message = await fetch(`/api/sites/${siteID}/comments/`,{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(body)
    })

    //UPDATE MESSAGE
    const jsonMessage = await message.json();
    dispatch({
        type: NEW_MESSAGE,
        payload: jsonMessage.message
    })

    //UPDATE COMMENTS
    const response = await fetch(`/api/sites/${siteID}/comments/`);
    const jsonData = await response.json();
    dispatch({
        type: NEW_COMMENT,
        payload: jsonData
    })
}

export const deleteComment = (siteID, commentID) => async dispatch => {
    //UPDATE DB
    const message = await fetch(`/api/sites/${siteID}/comments/${commentID}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    })

    //UPDATE MESSAGE
    const jsonMessage = await message.json();
    dispatch({
        type: NEW_MESSAGE,
        payload: jsonMessage.message
    })

    //UPDATE COMMENTS
    const response = await fetch(`/api/sites/${siteID}/comments/`);
    const jsonData = await response.json();
    dispatch({
        type: DELETE_COMMENT,
        payload: jsonData
    })
}

