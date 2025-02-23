import React from 'react';
import Header from '../header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../footer';

const MainLayout = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();

  const hidePaths = ['/login', '/register'];

  const shouldShowHeaderAndFooter = !hidePaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeaderAndFooter && <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      <Outlet context={{ darkMode }} />
      {shouldShowHeaderAndFooter && <Footer darkMode={darkMode} />}
    </>
  );
};

export default MainLayout;