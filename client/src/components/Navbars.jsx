import { useState } from "react";
import Routing from "./Routing";
import { Link, NavLink } from "react-router-dom";

import notif from './notif.png'
import msg from './msg.png'
import { useDispatch } from "react-redux";
import { Logout } from "../redux/actions/authaction";
export default function NavBar({ user }) {
  const [navbar, setNavbar] = useState(false);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  const LogoutHanlder = () => {
    dispatch(Logout());
  };
  return (
    <>
      <nav className="w-full first-line: bg-primary shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <NavLink to="/">
                <h2 className="text-2xl font-bold text-white">INSTAGRAM</h2>
              </NavLink>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              {!user.isConnected ? (
                <ul className="items-center justify-center  space-y-8 md:flex md:space-x-6  md:space-y-0">
                  <li className=" ">
                    <NavLink
                      to="/login"
                      exact="true"
                      className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                      Sign in
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      exact="true"
                      to="/register"
                      className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                    >
                      Sign up
                    </NavLink>
                  </li>
                </ul>
              ) :  "" }
              {user.isConnected ? (
                <>
                  <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    <li className="text-white hover:text-indigo-200">
                      <form className="max-w-sm px-4 mr-32 ">
                        <div className="relative ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <input
                            type="text"
                            placeholder="Search"
                            className="w-full py-2  pl-12 pr-56 text-gray-500 border rounded-full outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                          />
                        </div>
                      </form>
                    </li>

                    <li className=" ">
                      <NavLink
                        exact="true"
                        to="/l"  className=" " >
                        <img src={notif}  alt="" className=" w-6 rounded-md shadow"  />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        exact="true"
                        to="/r"
                        className=" "
                      >
                       <img src={msg}  alt="" className=" w-6 rounded-md shadow"  />
                      </NavLink>
                    </li>

                    <li>
                      <div className="flex" onClick={() => setSelect(!select)}>
                        <img src={user.pic} alt="" className="w-6 h-6" />
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      {select && (
                        <div
                          className="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex="-1"
                        >
                          <div className="py-1" role="none">
                            <Link
                              to='/myprofile'
                              className=" underline text-primary block px-2 py-2 text-sm"
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-5"
                              
                            > 
                             My Profile
                            </Link>
                            <Link
                              to="/"
                              onClick={LogoutHanlder}
                              className="text-red-700 block px-2 py-2 text-sm"
                              role="menuitem"
                              tabIndex="-1"
                              id="menu-item-4"
                            >
                              Logout
                            </Link>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>
                </>
              ):""}
            </div>
          </div>
        </div>
      </nav>

      <Routing user={user} />
    </>
  );
}
