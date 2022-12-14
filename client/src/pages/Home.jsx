import React, { useEffect } from 'react'
import HomeOne from '../components/HomeOne'
import HomeThree from '../components/HomeThree'
import HomeTwo from '../components/HomeTwo'

import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllUsers } from '../redux/actions/useraction'
import {subPost } from '../redux/actions/postaction'
export default function Home() {
  const users = useSelector(state => state.users) //all users 
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
    
      await dispatch(GetAllUsers());
      
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function fetchData() {
    
      await dispatch(subPost());
      
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className=' bg-[#f0f2f5]'>
     
      <div className='pages'>
        <><HomeOne users={users}/></>
        <><HomeTwo/></>
        <><HomeThree/></>


      </div>
      
      

       
    
    </Container>
  )
}
const Container= styled.div`
.pages{
    display:grid;
    grid-template-columns: 30% 1fr 20%;
}





`;