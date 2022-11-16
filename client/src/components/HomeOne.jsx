/* eslint-disable array-callback-return */
import React, { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  GetAllUsers, } from '../redux/actions/useraction';
import {Link} from 'react-router-dom'

export default function HomeOne({users}) {
 
  const  auth  = useSelector((state) => state.auth.user);// connect7
 
 
  const dispatch = useDispatch();
  
  



  

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
      {users?.map((users) => {
        if (auth._id !== users._id) return <Link   key={users._id} to={`/user/${users._id}`}>
          <li  className=' m-2 flex font-adelia text-gray-500  space-x-1 text-clip text-sm ml-4 '>
        <img  className ='w-6 h-6'src={users.pic} alt="" />
        <div className='w-32 block'>
        <p className={`w-32 text-primary`}>{users.fullname}</p> 
        <p className={`w-32 `}>{users.email}</p> 
        </div>
        
       
                </li>
         
         </Link> ;
      })} 
   


      </ul>
  
    
    
    </div>
  )
}
