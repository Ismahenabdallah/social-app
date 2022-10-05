import React, { useState } from 'react'
//import { useSelector } from 'react-redux'
import {BsPencilSquare} from 'react-icons/bs'
import '../App';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/actions/useraction';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
///const toastOptionssucc = {
///  position: "top-right",
///  autoClose: 8000,
///  pauseOnHover: true,
///  draggable: true,
///  theme: "light",
///};
export default function MyProfile({user}) {
   // const {user} =useSelector(state=>state.auth)
   const [showModal, setShowModal] = useState(false);
   

   const dispatch = useDispatch()
   const [form, setForm] = useState({
   
    pic:"",email:"", fullname:""
  
  })
   const [image, setImage ] = useState("");
   const [ url, setUrl ] = useState("");
   const uploadImage = (e) => {
     e.preventDefault();  
     const data = new FormData()
     data.append("file", image)
     data.append("upload_preset","lcxie1ud")
        data.append("cloud_name","dcd85e7v0")
        fetch("https://api.cloudinary.com/v1_1/dcd85e7v0/image/upload",{
             method:"post",
             body: data
             })
     .then(resp => resp.json())
     .then(data => {
     setUrl(data.url)
     })
     .catch(err => console.log(err))
     }
    const onChangeHandler = (e) => {
     setForm((previousValues) => ({
         ...previousValues,
        pic:url,
         [e.target.name]: e.target.value,  
         }));
 
 }
   
    const onSubmit = async (e) => {
       
     e.preventDefault();   
   
      dispatch(updateProfile(form))
      //if(true){
      //  toast.success('User Update Successfully!', toastOptionssucc)
      //}
  
 
   }
  return (
    <div>

{user?  <section className="  pt-16 bg-slate-100 ">
   <div className="w-full lg:w-[25.5rem] px-4 mx-auto">
 
     <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-2xl rounded-lg">
    
       <div className="p-6">
     
        <BsPencilSquare className="w-32 lg:-ml-14  mb-4 "   onClick={() => setShowModal(true)}/>
   
      
            {showModal ? (
                <>
                    <div className="fixed md:ml-96  lg:ml-96 w-[25.5rem] inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setShowModal(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                            <form className="mt-6"  onSubmit={onSubmit}>
           <div className="mb-2">
                   <label
                       htmlFor="Upload_pic"
                       className="block text-sm font-semibold text-gray-800"
                   >
                     Upload pic
                     {url ? <img className='w-6 h-6 ' src={url} alt=""/> : "" } 
                      
                   </label> <div className='block space-y-2 '>
                   <input  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="file" onChange= {(e)=> setImage(e.target.files[0])} required />
                 <button className='bg-primary p-2  rounded-md'  onClick={uploadImage}>upload</button>
         
                   </div>
                      </div>
           <div className="mb-2">
                   <label
                       htmlFor="fullname"
                       className="block text-sm font-semibold text-gray-800"
                   >
                     Fullname
                   </label>
                   <input onChange={onChangeHandler }
                       type="text" name="fullname" placeholder='your name !'
                       className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                       required  />
               </div>
               <div className="mb-2">
                   <label
                       htmlFor="email"
                       className="block text-sm font-semibold text-gray-800"
                   >
                       Email
                   </label>
                   <input onChange={onChangeHandler }
                       type="email" name="email" placeholder="your email adress !"
                       className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                       required />
               </div>
          
             
               <div className="mt-6 flex space-x-10">
                        <button type='submit' className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-primary focus:outline-none focus:bg-primary">
                        Update
                        </button>
                        <button   onClick={() => setShowModal(false)} className=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-primary focus:outline-none focus:bg-primary">
                     Cancel
                        </button>
                    </div>
             
             
           </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
      
  


      
         <div className="flex flex-wrap justify-center">
           <div className="w-full px-4 flex justify-center">
             <div className="relative">
               <img alt="..." src={user.pic} className="shadow-xl  h-auto align-middle 
               max-w-150-px"/>
             </div>
           </div>
           <div className="w-full px-4 text-center mt-8">
             <div className="flex justify-center  lg:pt-4 pt-8">
               <div className="mr-4 p-3 text-center">
                 <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                { user.followers.length}
                 </span>
                 <span className="text-sm text-gray-400">Followers</span>
               </div>
               <div className="mr-4 p-3 text-center">
                 <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                 {user.following.length }
                 </span>
                 <span className="text-sm text-gray-400">Following</span>
               </div>
               <div className="mr-4 p-3 text-center">
                 <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                   10
                 </span>
                 <span className="text-sm text-gray-400">Photos</span>
               </div>
               <div className="lg:mr-4 p-3 text-center">
                 <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                   89
                 </span>
                 <span className="text-sm text-gray-400">Comments</span>
               </div>
             </div>
           </div>
         </div>
         <div className="text-center mt-8">
           <h3 className="text-xl font-semibold leading-normaltext-gray-700 mb-2">
             {user.fullname}
           </h3>
           <div className="mb-2 text-gray-600 mt-10">
             <i className="fas fa-solid fa-heart mr-2 text-lg text-gray-400"/>
            Single
           </div>
           <div className="mb-2 text-gray-600 ">
             <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"/>
             Los Angeles, California
           </div>
           <div className="mb-2 text-gray-600 ">
           <i className="fas fa-briefcase mr-2 text-lg text-gray-400"></i>
             Solution Manager - Creative Tim Officer
           </div>
           <div className="mb-2 text-gray-600">
             <i className="fas fa-university mr-2 text-lg text-gray-400"></i>
             University of Computer Science
           </div>
         </div>
        
       </div>
     </div>
   </div>

   </section> :"Not Found"}

   <ToastContainer/>
</div>




  
   
  )
}
