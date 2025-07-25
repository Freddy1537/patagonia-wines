import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RutasProtegidas = ({ children }) => {
  const { usuario } = useAuth();

  return usuario ? children : <Navigate to="/login" replace />;
};

export default RutasProtegidas;
