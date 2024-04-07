import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import V2Nav from "./navbar";

const Layout = () => {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNav && <V2Nav />}
      <Outlet />
    </>
  );
};

export default Layout;
