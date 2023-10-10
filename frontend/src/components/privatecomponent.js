import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const privateComponent = () => {
  const auth = localStorage.getItem("localinfo");
  return auth ? <Outlet /> : <Navigate to="/register" />;
};

export default privateComponent;
