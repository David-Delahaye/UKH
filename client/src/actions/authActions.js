import {LOGIN_USER, LOGOUT_USER, FETCH_USER, NEW_MESSAGE} from './types';

export const loginUser = (e) => async dispatch => {
    //REQUEST
    const username = e.target.username.value;
    const password = e.target.password.value;
    const body = {"username":username, "password":password}
    const response = await fetch("/api/login",{
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify(body)
    });
    const jsonData = await response.json();
    //ON SUCCESS
    if (response.status === 200){
        //UPDATE USER
        dispatch({
            type: LOGIN_USER,
            payload: jsonData.user
        })
        //UPDATE MESSAGE
        dispatch({
            type: NEW_MESSAGE,
            payload: jsonData.message
        })
    //ON FAIL
    }else if (response.status === 401){
        dispatch({
            type: NEW_MESSAGE,
            payload: jsonData.message
        })
    }
}

export const logoutUser = (e) => async dispatch => {
    //REQUEST
    const response = await fetch('/api/logout');
    const jsonData = await response.json();
    dispatch({
        type: NEW_MESSAGE,
        payload: jsonData.message
    })
    dispatch({
        type: LOGOUT_USER,
        payload: jsonData.user
    })

}

export const fetchUser = (e) => async dispatch => {
    const response = await fetch('/api/user');
    const jsonData = await response.json();
    dispatch({
        type: FETCH_USER,
        payload: jsonData.user
    })
}
