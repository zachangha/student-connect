import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import V2Nav from "./navbar";
import Footer from "./footer";

const Layout = () => {
  const location = useLocation();
  const hideNav = ["/login", "/", "/register", "/about"].includes(
    location.pathname
  );

  const hideFooter = ["/about"].includes(location.pathname);

  return (
    <>
      {!hideNav && <V2Nav />}
      {!hideFooter && <Footer />}
      <Outlet />
    </>
  );
};

export default Layout;
