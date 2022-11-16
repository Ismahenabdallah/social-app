import axios from "axios";
import { ALLUSERS, ONEUSER, ERRORS, FOLLOW, UNFOLLOW,UPDATE, SEARCH } from "../type";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptionssucc = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
 

  const toastOptionserrrors = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

export const GetAllUsers = () => dispatch => {
    axios.get("http://localhost:5000/getallusers")
        .then(res => {
            dispatch({
                type: ALLUSERS,
                payload: res.data
            })
            localStorage.setItem("allusres",JSON.stringify(res.data))
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
            localStorage.setItem("Oneusre",JSON.stringify(res.data))
        })
        .catch(err => {
            dispatch({
                type: ERRORS,
                payload: err.response.data
            })
        });
}
export const followusers = (followId ,setFollow)=>async dispatch =>{
    await axios.put(`http://localhost:5000/follow`,
    {
        followId
    }).then(async(data)=>{
   
       await dispatch({
            type:FOLLOW ,
            payload:data
        })
        toast.success('User Followed Successfully!', toastOptionssucc)
        //localStorage.setItem("user",JSON.stringify(data))
        setFollow(false)
    }).catch(async err => {
        await dispatch({
            type: ERRORS,
            payload: err.response.data
        })
        toast.error(err.response.data, toastOptionserrrors)
    }); 
}
export const unfollowusers = (unfollowId , setFollow )=>async dispatch =>{
    await axios.put(`http://localhost:5000/unfollow`,
    {
        unfollowId
    }).then(async(data)=>{
   
       await dispatch({
            type:UNFOLLOW ,
            payload:data
        })
        toast.success('User UnFollowed !', toastOptionssucc)
        //localStorage.setItem("user",JSON.stringify(data))
        setFollow(true)
    }).catch(async err => {
        await dispatch({
            type: ERRORS,
            payload: err.response.data
        })
        toast.error(err.response.data, toastOptionserrrors)
    });
}
export const updateProfile = (form)=>async dispatch =>{
    await axios.post(`http://localhost:5000/update`,form)
    .then(res=>{
        dispatch({
            type: UPDATE,
            payload: res.data
        })
        toast.success('User Update Successfully!', toastOptionssucc)

    })
    .catch(err=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
    })
}
export const searchUser = (query)=>dispatch=>{
    axios.post('http://localhost:5000/search',{query}).then((res)=>{
        dispatch({
            type: SEARCH,
            payload: res.data
        })
      
        
    }).catch((err)=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
        
    
    })
    
    
    
    }