/* eslint-disable array-callback-return */

import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  followusers,
  GetOneUser,
  unfollowusers,
} from "../redux/actions/useraction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetAllUPost } from "../redux/actions/postaction";

export default function Profile() {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth.user);
  const [follow, setFollow] = useState(
    auth ? !auth.following.includes(id) : true
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      await dispatch(GetAllUPost());
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Followu = async () => {
    await dispatch(followusers(id, setFollow));
  };

  const unFollowu = async () => {
    await dispatch(unfollowusers(id, setFollow));
  };

  const profile = useSelector((state) => state.profile.user);
  const postUser = useSelector((state) => state.profile.posts);
  console.log(postUser)
  const posts = useSelector((state) => state.post.posts);
  console.log(posts);

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
    <div>
      {profile ? (
        <div className="container  text-center m-7 ">
          <div className="flex ml-44  border-b-2 w-[70%] p-2 border-b-gray-400">
            <div className=" border-2 border-gray-400 rounded-full p-0">
              <img
                className="w-24  h-full rounded-full "
                src={profile.pic}
                alt=""
              />
            </div>
            <div className="ml-[40%] text-start">
              <h1 className="text-2xl uppercase text-slate-500  ">
                @{profile.fullname}
              </h1>
              <h1 className="text-xl  text-slate-700  ">{profile.email}</h1>

              {id !== auth._id && (
                <div>
                  {follow ? (
                    <button
                      onClick={Followu}
                      className={` text-lg text-center p-2 capitalize text-primary bg-gray-400 hover:bg-slate-500`}
                    >
                      {" "}
                      follow{" "}
                    </button>
                  ) : (
                    <button
                      onClick={unFollowu}
                      className={` text-lg text-center p-2 capitalize text-primary bg-gray-400 hover:bg-slate-500`}
                    >
                      {" "}
                      unfollow{" "}
                    </button>
                  )}
                </div>
              )}
              <div className="flex text-slate-700 text-sm space-x-2">
                <h1> followers :{profile.followers?.length}</h1>
                <h1> following :{profile.following?.length}</h1>
                <h1> posts :{postUser?.length}</h1>

              </div>
            </div>
          </div>

          <div className="mt-2 bg-gray-500"></div>

          <div className="  container  text-center m-7  grid grid-cols-3 space-x-2 space-y-2  ">
            {posts?.map((item) => {
              if (id === item.postedBy._id)
                return (
                  <div className="" key={item._id}>
                    <img className="w-44 h-20" src={item.photo} alt="" />
                  </div>
                );
            })}
          </div>
        </div>
      ) : (
        " Not Found"
      )}

      <ToastContainer />
    </div>
  );
}
