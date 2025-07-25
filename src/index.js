import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { CarritoProvider } from "./context/ContextCarrito";
import { AuthProvider } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>
);
