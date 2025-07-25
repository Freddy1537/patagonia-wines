import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";
import NuevoProducto from "./pages/NuevoProducto";
import EditarProducto from "./pages/EditarProducto";
import Login from "./pages/Login";
import CrearCuenta from "./pages/CrearCuenta";
import RutasProtegidas from "./components/RutasProtegidas";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />

        {/* Protegidas */}
        <Route
          path="/nuevo-producto"
          element={
            <RutasProtegidas>
              <NuevoProducto />
            </RutasProtegidas>
          }
        />
        <Route
          path="/editar-producto/:id"
          element={
            <RutasProtegidas>
              <EditarProducto />
            </RutasProtegidas>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
