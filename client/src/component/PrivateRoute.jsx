// components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Adjust based on your state structure

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
