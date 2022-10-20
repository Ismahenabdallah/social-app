/* eslint-disable array-callback-return */
import React from "react";
import { useState } from "react";
import {BiLike , BiDislike} from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { likepost } from "../redux/actions/postaction";

// eslint-disable-next-line no-unused-vars

export default function DataPost() {
  const{user} = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.post.subpost);
const [comment, setcomment] =useState()
//const [Like,setLike]  =useState(posts?!posts.likes.includes(user._id):true)
  const addFields = () => {
    let object = {
        commentaire:'',
      
    }

    setcomment([...comment, object])
  }
  const dispatch= useDispatch()
const like =(id)=>{
 dispatch(likepost(id))
}

  return (
    <div className=" mt-2 space-y-4  mb-4">
     
      {posts?.map((posts, index) => {
        return (
          <div
            key={index}
            className="block shadow-md border-2 bg-white  "
          >
            <Link to={`/user/${posts.postedBy._id}`} key={index} className="flex mt-2  space-x-2">
                      <img
                        className="rounded-full w-6 mt-1 border-2 border-gray-600 h-6"
                        src={posts.postedBy.pic}
                        alt=""
                      />
                      <p className="text-2xl text-primary  ">{posts.postedBy.fullname}</p>
                    </Link>
           
           <div className="block">
           <h1 className="text-start ml-6">{posts.body}</h1>
            <img
              className="rounded-md ml-6 w-[80vh] h-[40vh] mb-4"
              src={posts.photo}
              alt=""
            />
            <div className="flex mb-4 ml-6 space-x-5">
           
            <button onClick={like(posts._id)}> <BiLike size={'20'} className="" /></button>
            <button > <BiDislike size={'20'} className=""/> </button> 
            </div>
            <form>

            </form>
           </div>
          </div>
        );
      })}
    </div>
  );
}
