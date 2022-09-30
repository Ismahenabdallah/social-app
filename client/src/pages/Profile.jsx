import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import {  GetOneUser } from '../redux/actions/useraction';
export default function Profile({user}) {
  const [showfollow,setShowFollow] = useState()
  const [userProfile,setProfile] = useState(null)
  console.log(userProfile)
  const followUser = ()=>{
    fetch('http://localhost:5000/follow',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            followId:id
        })
    }).then(res=>res.json())
    .then(data=>{
     console.log(data)
       
        
      
         setShowFollow(false)
    })
}
const unfollowUser = ()=>{
    fetch('http://localhost:5000/unfollow',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
            unfollowId:id
        })
    }).then(res=>res.json())
    .then(data=>{
        
        dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
         localStorage.setItem("user",JSON.stringify(data))
        
         setProfile((prevState)=>{
            const newFollower = prevState.user.followers.filter(item=>item !== data._id )
             return {
                 ...prevState,
                 user:{
                     ...prevState.user,
                     followers:newFollower
                    }
             }
         })
         setShowFollow(true)
         
    })
}
    const { id } = useParams();
    const profile = useSelector(state => state.profile) 
  
    const dispatch = useDispatch();

    useEffect(() => {
      async function fetchData() {
      
        await dispatch(GetOneUser(id));
        
      }
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    /****
     *  na3mel dipatch lil getallusers w nesta5dem user[] or this method
     * {users.map((users,index)=>(
     * 
    <div key={index}>

    {
        users._id===id ? (<h1>{users.email}</h1>) : ""
    }
    </div>))}  */
   
  return (
    <>
     {profile ?   <div className='container  text-center m-7 '>

<div className='flex ml-44  border-b-2 w-[70%] p-2 border-b-gray-400'>
<div className=' border-2 border-gray-400 rounded-full p-0'>
<img className='w-24  h-full rounded-full ' src={profile.pic} alt=""/>
</div>
<div className='ml-[40%] text-start'>
<h1 className='text-2xl uppercase text-slate-500  '>@{profile.fullname}</h1>
<h1 className='text-xl  text-slate-700  '>{profile.email}</h1>
<button onClick={followUser}   className={` text-lg text-center p-2 capitalize text-primary bg-gray-400 hover:bg-slate-500`} >follow  </button>
 
</div>
</div>

  
  


     
    </div> :" Not Found"}
    
    </>
   
   
  )
}
