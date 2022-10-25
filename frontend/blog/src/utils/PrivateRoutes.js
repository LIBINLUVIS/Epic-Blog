import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'


const  PrivateRoutes=({children,...rest})=> {
  // localStorage.getItem('user_token')
  return (
     localStorage.getItem('user_token')  ? <Outlet/>: <Navigate to="/signin"/>
  )
}

export default PrivateRoutes
