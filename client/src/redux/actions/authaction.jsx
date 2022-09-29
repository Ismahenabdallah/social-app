
import axios from 'axios';
import { ERRORS, SET_USER } from '../type';
import jwt_decode from 'jwt-decode'
import { setAuth } from '../../util/setAuth';


export const Registration = (form,setMessage,setSuccessful)=>dispatch=>{
    axios.post('http://localhost:5000/register', form) 
    .then(res=>{
        setSuccessful(true)
      setMessage("Register Success! Please activate your email to start.")
     
      dispatch({
         type:ERRORS,
          payload: {}
      })
    })
    .catch(err=>{
        setSuccessful(false)
        dispatch({
            type:ERRORS,
            payload: err.response.data
        })
    })
}
export const LoginAction = (form)=>dispatch=>{
    axios.post('http://localhost:5000/login', form) 
    .then(res=>{
       
      const {token} = res.data
      localStorage.setItem("jwt", token)
      const decode = jwt_decode(token)
      dispatch(setUser(decode))
      setAuth(token)
     
       })
    .catch(err=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
       
    })
}
export const Logout = ()=>dispatch=>{
    localStorage.removeItem('jwt')
    dispatch({
        type: SET_USER,
        payload: {}
    })
}

export const setUser = (decode)=>({
    type: SET_USER,
    payload: decode
})