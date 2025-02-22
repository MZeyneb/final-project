import React from 'react'
import AdminHeader from '../header/adminHeader'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'

const AdminLayout = () => {
  return (
    <>
    <AdminHeader/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default AdminLayout
