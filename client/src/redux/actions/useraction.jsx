import axios from "axios";
import { ALLUSERS, ONEUSER, ERRORS, FOLLOW, UNFOLLOW } from "../type";

export const GetAllUsers = () => dispatch => {
    axios.get("http://localhost:5000/getallusers")
        .then(res => {
            dispatch({
                type: ALLUSERS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        });
}
export const GetOneUser = (id) => dispatch => {
    axios.get(`http://localhost:5000/user/${id}`)
        .then(res => {
            dispatch({
                type: ONEUSER,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        });
}
export const followusers =(id, data)=>dispatch =>{
    axios.put(`http://localhost:5000/follow/${id}`, data).then(res=>{
        console.log(res)
        dispatch({
            type:FOLLOW ,
            data:id
        })
    }).catch(err => {
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    });
}
export const unfollowusers =(id, data)=>dispatch =>{
    axios.put(`http://localhost:5000/unfollow/${id}`, data).then(res=>{
        dispatch({
            type:UNFOLLOW ,
            data:id
        })
    }).catch(err => {
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    });
}