import React, { useState, useEffect, useRef } from 'react';
import styles from "./index.module.scss";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { IoMdChatboxes } from "react-icons/io";


const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isUnderlayOpen, setIsUnderlayOpen] = useState(false);
  const underlayRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Klikləri dinləmək üçün useEffect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (underlayRef.current && !underlayRef.current.contains(event.target)) {
        setIsUnderlayOpen(false); // Klik underlay xaricindədirsə, bağla
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <nav>
        <div className="container">
          <div className={styles["box"]}>
            <h1>Edvance.</h1>
            <ul>
              <li><NavLink to={'/'}>Ana Səhifə</NavLink></li>
              <li><NavLink to={'/about'}>Haqqımızda</NavLink></li>
              <li><NavLink to={'/forum'}>Forum</NavLink></li>
              <li><NavLink to={'/books'}>Kitablar</NavLink></li>
              <li><NavLink to={'/explore'}>Kəşf et</NavLink></li>
            </ul>
            {user ? (
              <div className={styles["rightside"]}>
                {/* <IoMdChatboxes onClick={() => navigate('/chat')} style={{ cursor: 'pointer' }} /> */}

                <div
                  className={styles["user"]}
                  onClick={() => setIsUnderlayOpen(!isUnderlayOpen)}
                  ref={underlayRef}
                >
                  <div className={styles["logo"]}>
                    <img src={user.avatar} alt='' width={100} />
                  </div>
                  <h3>{user.name}</h3>
                  <div
                    className={`${styles["underlay"]} ${isUnderlayOpen ? styles["open"] : ''}`}
                  >
                    <ul>
                      <li><Link to={"/calendar"}>Cədvəlim</Link></li>
                      <li><Link to={"/profilim"}>Profilim</Link></li>
                      <li><Link to={""}>Oxuduqlarım</Link></li>
                      <li><Link to={""}>Dostlarım</Link></li>
                      <li><Link to={""}>Sazlamalar</Link></li>
                      <span onClick={handleLogout}><Link to={""}>Çıxış</Link></span>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles["btns"]}>
                <NavLink to="/login"><button className={styles["login"]}>Daxil ol</button></NavLink>
                <NavLink to="/register"><button className={styles["register"]}>Qeydiyyatdan keç</button></NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;