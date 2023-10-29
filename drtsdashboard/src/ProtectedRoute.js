// ProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ element, ...rest }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <Route element={element} {...rest} />;
}

export default ProtectedRoute;
