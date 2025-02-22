  import { useState } from 'react'

  import './App.css'
  import { Navigate, Route, Routes } from 'react-router-dom'
  import MainLayout from './layouts/mainLayout'
  import { useAuth } from './context/authContext'
  import Register from './pages/user/Register/register'
  import Home  from "./pages/user/home"
  import Login from './pages/user/Login/login'
  import AdminLayout from './layouts/adminLayout'
  import About from './pages/user/about'
  import Forum from './pages/user/forum'
  import Explore from './pages/user/explore'
import ProfilePage from './pages/user/profilepage'
import Calendar from './pages/user/events'
import BookSearch from './pages/user/books'
  function App() {
    const {user} = useAuth()

    return (
      <>
      <Routes>
      <Route path='/' element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='/login' element={!user ? <Login/> : <Navigate to={user.role === 'admin' ? 'admin' : '/'}/>}/>
      <Route path='/register' element={!user ? <Register/> : <Navigate to={user.role === 'admin' ? '/admin' : '/user'}/>}/>
      <Route path="/user" element={user?.role === 'user' ? <MainLayout /> : <Navigate to="/login" />}/>
      <Route path='/books' element={<BookSearch/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/forum' element={<Forum/>}/>
      <Route path='/explore' element={<Explore/>}/>
      <Route path="/profilim" element={<ProfilePage />} /> 
      <Route path="/calendar" element={<Calendar />} />





      </Route>


      <Route path="/admin" element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>
      
      </Route>
      </Routes>
        
      </>
    )
  }

  export default App
