import { useState } from "react";
import { Navigate, Outlet, useOutlet } from "react-router-dom";
import React, { useEffect } from "react";

const ProtectedLayout = ({ redirectPath = "/login", children }) => {
  const [isLoggedin, setIsLoggedin] = useState(
    sessionStorage.getItem("login") || false
  );

  useEffect(() => {
    if (sessionStorage.getItem("login") === "true") {
      setIsLoggedin(true);
    }
  }, [isLoggedin]);

  if (!isLoggedin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedLayout;
