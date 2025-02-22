import React from 'react';
import Header from '../header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../footer';

const MainLayout = () => {
  const location = useLocation();

  // Header və Footer-i gizlədəcək yollar
  const hidePaths = ['/login', '/register'];

  // Əgər cari yol hidePaths-də deyilsə, Header və Footer-i göstər
  const shouldShowHeaderAndFooter = !hidePaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeaderAndFooter && <Header />}
      <Outlet />
      {shouldShowHeaderAndFooter && <Footer />}
    </>
  );
};

export default MainLayout;