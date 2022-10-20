import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ALLPOST, DISLIKE, ERRORS, LIKE, SHAREPOST, SUB } from "../type";

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
export const SHARE = (form)=>dispatch=>{
axios.post('http://localhost:5000/share', form).then((res)=>{
    dispatch({
        type: SHAREPOST,
        payload: res.data
    })
  
    
}).catch((err)=>{
    dispatch({
        type: ERRORS,
        payload: err.response.data
    })
    toast.error(err.response.data, toastOptionserrrors)

})



}
export const subPost= ()=>dispatch=>{
    axios.get('http://localhost:5000/sub')
    .then((res)=>{
        //console.log(res)
        dispatch({
            type: SUB,
            payload: res.data
        })
       
    })
    .catch((err)=>{
        dispatch({
            type: ERRORS,
            payload: err.response.data
        })
        toast.error(err.response.data, toastOptionserrrors)
    })
}
export const GetAllUPost = () => dispatch => {
    axios.get("http://localhost:5000/allpost")
        .then(res => {
            dispatch({
                type: ALLPOST,
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
export const likepost = (postId ,setLike)=>async dispatch =>{
    await axios.put(`http://localhost:5000/like`,
    {
        postId
    }).then(async(data)=>{
   
       await dispatch({
            type:LIKE ,
            payload:data
        })
        toast.success('Post Liked Successfully!', toastOptionssucc)
        //localStorage.setItem("user",JSON.stringify(data))
        setLike(false)
    }).catch(async err => {
        await dispatch({
            type: ERRORS,
            payload: err.response.data
        })
        toast.error(err.response.data, toastOptionserrrors)
    }); 
}
export const dislikepost = (postId ,setdisLike)=>async dispatch =>{
    await axios.put(`http://localhost:5000/dislike`,
    {
        postId
    }).then(async(data)=>{
   
       await dispatch({
            type:DISLIKE ,
            payload:data
        })
        toast.success('ALREADY LIKES!', toastOptionssucc)
        //localStorage.setItem("user",JSON.stringify(data))
        setdisLike(false)
    }).catch(async err => {
        await dispatch({
            type: ERRORS,
            payload: err.response.data
        })
        toast.error(err.response.data, toastOptionserrrors)
    }); 
}