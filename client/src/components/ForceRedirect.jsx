import React from 'react'
import { Navigate } from 'react-router-dom'
/*
KIF TEBDA CONNECTE M TADHERLIKCH PAGE INSCRIRE */


const ForceRedirect = ({user, children}) =>{
    if(user.isConnected){
        return <Navigate to="/home" replace/> 
      } 
      return children
}

export default ForceRedirect