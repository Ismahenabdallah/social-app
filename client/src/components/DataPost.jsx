/* eslint-disable array-callback-return */
import React from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Commentaire,
  dislikepost,
  likepost,
} from "../redux/actions/postaction";

// eslint-disable-next-line no-unused-vars

export default function DataPost() {
  const posts = useSelector((state) => state.post.subpost);

  const dispatch = useDispatch();
  const like = (id) => {
    dispatch(likepost(id));
  };

  const DISlike = (id) => {
    dispatch(dislikepost(id));
  };
 

  return (
    <div className=" mt-2 space-y-4  mb-4">
      {posts?.map((posts, index) => {
        return (
          <div key={index} className="block shadow-md border-2 bg-white  ">
            <Link
              to={`/user/${posts.postedBy._id}`}
              key={index}
              className="flex mt-2  space-x-2"
            >
              <img
                className="rounded-full w-6 mt-1 border-2 border-gray-600 h-6"
                src={posts.postedBy.pic}
                alt=""
              />
              <p className="text-2xl text-primary  ">
                {posts.postedBy.fullname}
              </p>
            </Link>

            <div className="block">
              <h1 className="text-start ml-6">{posts.body}</h1>
              <img
                className="rounded-md ml-6 w-[80vh] h-[40vh] mb-4"
                src={posts.photo}
                alt=""
              />

              <div className="flex mb-4 ml-6 space-x-5">
                <button
                  onClick={() => {
                    like(posts._id);
                  }}
                >
                  
                  <BiLike size={"20"} className="" />
                </button>
                {posts.likes.length > 1 && <h2>{posts.likes.length} likes </h2>}
                <button
                  onClick={() => {
                    DISlike(posts._id);
                  }}
                >
                  
                  <BiDislike size={"20"} className="" />
                </button>
              </div>
          <div className="text-left space-x-2 mt-2">
          <form className="ml-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  //commentaire(e.target[0].value, posts._id);// errors
                  dispatch(Commentaire(e.target[0].value, posts));
                }}
              >
                <input type="text" placeholder="add a comment" className="outline-none  " />
              </form>
              <div >
                {posts.comments?.map((cm) => {
                  return (
                    <div className="flex  space-x-2"  key={cm._id}>
                      <img src={cm.postedBy.pic} alt="" className="w-6 h-6 rounded-full"/>
                      <h6 className="block">
                   
                       <p className="text-primary">{cm.postedBy.fullname}</p> 
                     <p className="text-gray-400">{cm.text}</p>
                      
                    </h6>
                    </div>
                    
                  );
                })}
              </div>
          </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
