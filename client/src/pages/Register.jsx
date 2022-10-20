/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Registration } from "../redux/actions/authaction";
export default function Register() {
  const [form, setForm] = useState({
    pic: "",
    email: "",
    password: "",
    confirmpassword: "",
    fullname: "",
  });

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };


  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors.errors);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");


  const onChangeHandler = (e) => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "lcxie1ud");
      data.append("cloud_name", "dcd85e7v0");
      fetch("https://api.cloudinary.com/v1_1/dcd85e7v0/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUrl(data.url);
        })
        .catch((err) => console.log(err));
    }
    setForm((previousValues) => ({
      ...previousValues,
      pic: url,

      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(Registration(form, setMessage, setSuccessful));
  };

  /*node:internal/errors:477
    ErrorCaptureStackTrace(err); */
  return (
    <div>
      <div className="relative  flex flex-row  justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
            Sign up
          </h1>
          <form className="mt-6" onSubmit={onSubmit}>
            <div className="mb-2">
              <label
                htmlFor="Upload_pic"
                className="block text-sm font-semibold text-gray-800"
              >
                Upload pic
              </label>
            
                  <input type="file"  onChange={onImageChange} />
             
            </div>
            <div className="mb-2">
              <label
                htmlFor="fullname"
                className="block text-sm font-semibold text-gray-800"
              >
                Fullname
              </label>
              <input
                onChange={onChangeHandler}
                type="text"
                name="fullname"
                placeholder="your name !"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                onChange={onChangeHandler}
                type="email"
                name="email"
                placeholder="your email adress !"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                onChange={onChangeHandler}
                type="password"
                name="password"
                placeholder="your password !"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <input
                onChange={onChangeHandler}
                type="password"
                name="confirmPassword"
                placeholder="confirm password  !"
                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <a href="#" className="text-xs text-primary hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-primary focus:outline-none focus:bg-primary"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Already have an account?{" "}
            <span>
              <a className="text-primary hover:underline" href="/login">
                Log in
              </a>
            </span>
          </div>
        </div>
        <div className="mt-64 mr-11 ">
          {errors ? (
            <div className="py-5 px-2 w-40 bg-red-400 ">{errors.msg}</div>
          ) : (
            ""
          )}
          {successful ? (
            <div className=" py-5 px-2 w-40 bg-green-400 ">{message}</div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
