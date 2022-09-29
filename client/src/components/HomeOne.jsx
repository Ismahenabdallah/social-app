import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followusers, GetAllUsers, unfollowusers } from '../redux/actions/useraction';
import {useParams} from 'react-router-dom'

export default function HomeOne({users}) {
 
  const  auth  = useSelector((state) => state.auth.user);// connect7
 
  const {userid} = useParams()

  const dispatch = useDispatch();
  
  const [showfollow,setShowFollow] = useState()
  const [userProfile,setProfile] = useState(null)
const handleFollow = async ()=>{
       await  fetch(`http://localhost:5000/follow`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
               
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>{res.json()
        console.log(res)})
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }


  

  useEffect(() => {
    async function fetchData() {
    
      await dispatch(GetAllUsers());
      
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1 className='text-primary text-xl mt-8  align-middle'>#My followers</h1>    
      <ul >
      {users.map((users) => {
         if (auth._id !== users._id) return <li  key={users._id} className=' m-2 flex font-adelia text-gray-500  space-x-1 text-clip text-sm ml-4 '>
        <img  className ='w-6 h-6'src={users.pic} alt="" />
        <div className='w-32 block'>
        <p className={`w-32 text-primary`}>{users.fullname}</p> 
        <p className={`w-32 `}>{users.email}</p> 
        </div>
        
       
         <button   onClick={handleFollow} className={` border  p-2 capitalize text-primary border-5 bg-gray-300 hover:bg-slate-500`} >follow  </button>
         </li> ;
      })} 
   


      </ul>
    
    
    
    </div>
  )
}
