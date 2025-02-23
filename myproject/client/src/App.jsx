import { useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import { useAuth } from './context/authContext';
import Register from './pages/user/Register/register';
import Home from "./pages/user/home";
import Login from './pages/user/Login/login';
import AdminLayout from './layouts/adminLayout';
import About from './pages/user/about';
import Forum from './pages/user/forum';
import Explore from './pages/user/explore';
import ProfilePage from './pages/user/profilepage';
import Calendar from './pages/user/events';
import BookSearch from './pages/user/books';

function App() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false); // Dark mode state-i

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Routes>
        <Route path='/' element={<MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route index element={<Home darkMode={darkMode} />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to={user.role === 'admin' ? 'admin' : '/'} />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to={user.role === 'admin' ? '/admin' : '/user'} />} />
          <Route path="/user" element={user?.role === 'user' ? <MainLayout darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> : <Navigate to="/login" />} />
          <Route path='/books' element={<BookSearch darkMode={darkMode} />} />
          <Route path='/about' element={<About darkMode={darkMode} />} />
          <Route path='/forum' element={<Forum darkMode={darkMode} />} />
          <Route path='/explore' element={<Explore darkMode={darkMode} />} />
          <Route path="/profilim" element={<ProfilePage darkMode={darkMode} />} />
          <Route path="/calendar" element={<Calendar darkMode={darkMode} />} />
        </Route>

        <Route path="/admin" element={user?.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" />}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;