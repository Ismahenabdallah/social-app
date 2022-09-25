import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { LoginAction } from "../redux/actions/authaction";

export default function Login() {
  const [form, setForm] = useState({});

 
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const errors = useSelector((state) => state.errors);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginAction(form));
   
  };
  return (
    <div className="relative flex flex-row justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={onSubmit}>
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
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="/forget" className="text-xs text-primary hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button type="submit"   className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-primary focus:outline-none focus:bg-primary">
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center w-full my-4">
          <hr className="w-full" />
          <p className="px-3 ">OR</p>
          <hr className="w-full" />
        </div>
        <div className=" mt-4  my-6 space-y-2">
          <button
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Google</p>
          </button>
        </div>

        <div className="mt-4 text-grey-600">
          Don't have an account?{" "}
          <span>
            <a className="text-primary hover:underline" href="/register">
              Sign up
            </a>
          </span>
        </div>
      </div>
      <div className="mt-64 mr-11 ">
        {errors.msg ? (
          <div className="py-5 px-2 w-40 bg-red-400 ">{errors.msg}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
