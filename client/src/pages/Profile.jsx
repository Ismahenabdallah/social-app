import React from 'react'
import { useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
export default function Profile({user}) {

    const {userid} = useParams()
  return (
    <div>
      <h1>hi </h1>
    </div>
  )
}
