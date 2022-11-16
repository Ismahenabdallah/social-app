import axios from "axios"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ALLPOST,COMMENT, DISLIKE, ERRORS, LIKE, SHAREPOST, SUB } from "../type";

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
axios.post('http://localhost:5000/share',form).then((res)=>{
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
export const likepost = (id)=>async dispatch =>{
    await axios.put(`http://localhost:5000/like`,
    {
        postId:id
    }).then(async(data)=>{
   
       await dispatch({
            type:LIKE ,
            payload:data
        })
        toast.success('Post Liked Successfully!', toastOptionssucc)
        //localStorage.setItem("user",JSON.stringify(data))
     
    }).catch(async err => {
        await dispatch({
            type: ERRORS,
            payload: err.response.data
        })
        toast.error(err.response.data, toastOptionserrrors)
    }); 
}

export const dislikepost = (id)=>async dispatch =>{
    await axios.put(`http://localhost:5000/dislike`,
    {
        postId:id
    }).then(async(data)=>{
   
       await dispatch({
            type:DISLIKE ,
            payload:data
        })
       
       
    }).catch(async err => {
        await dispatch({
            type: ERRORS,
            payload: err.response.data
        })
        toast.error(err.response.data, toastOptionserrrors)
    }); 
}
export const Commentaire =(text,postId)=> async dispatch=>{
    axios.put('http://localhost:5000/c', 
    {postId, text })
    .then((data)=>{
        dispatch({
            type:COMMENT,
            payload:data.res

        })

    }).catch((err)=>{
        dispatch({
            type:ERRORS,
            payload:err.response

        })
    })
}
