import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followusers, GetAllUsers, unfollowusers } from '../redux/actions/useraction';


export default function HomeOne({users}) {
 
  const  auth  = useSelector((state) => state.auth.user);// connect7
  const  userid  = useSelector((state) => state.auth.user._id);// connect7


  const dispatch = useDispatch();
  
///const [f , setF ] =useState(users)
const handleFollow = async () => {
  
   dispatch(followusers(users._id, userid))
    //: dispatch(followusers(users._id, userid));
  //setF((prev) => !prev);
 

 }; 

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
        <img  className ='w-6 h-6'src={users.pic} alt="" /><p className={`w-32`}>{users.fullname}</p> 
         <button   onClick={handleFollow} className={` border  p-2 capitalize text-primary border-5 bg-gray-300 hover:bg-slate-500`} >follow  </button>
         </li> ;
      })} 
   


      </ul>
    
    
    
    </div>
  )
}
