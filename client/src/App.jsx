
import { BrowserRouter as Router } from 'react-router-dom';
import './App';
import Navbars from './components/Navbars';
import store from './redux/store'
import jwt_decode from 'jwt-decode'
import { Logout, setUser } from './redux/actions/authaction';
import { useSelector } from 'react-redux';
import { setAuth } from './util/setAuth';
import React from 'react';
import { useEffect } from 'react';
import { ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* kif na3mil refresh maydi3ech el compte */
if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt)
  store.dispatch(setUser(decode))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now / 1000

  if (decode.exp > currentDate) {
    store.dispatch(Logout())
  }
}

export default function App() {
 

  const auth = useSelector(state => state.auth)
  const user = {
    isConnected: auth.isConnected,
    id:auth.user._id,
    pic:auth.user.pic,
    fullname:auth.user.fullname,
    email:auth.user.email,
    followers:auth.user.followers,
    following:auth.user.following,
    livesIn:auth.user.livesIn ,
    worksAt: auth.user.worksAt,
    relationship: auth.user.relationship,
    country:auth.user.country,
  }
  const toastOptionserrrors = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
 const err =useSelector(state=>state.errors.errors)
 useEffect(() => {
  toast.error(err, toastOptionserrrors)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
 
  return  (
  
        <React.Suspense fallback="looding....">
        <Router>
          <Navbars user={user} />

         
        

        </Router>
        <ToastContainer/>
        </React.Suspense>
       

     
     



    )
}