
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user === null) return null; 

  if (!user || user.email !== "admin@user.com") {
    return <Navigate to="/" replace />;
  }

  return children;
};
