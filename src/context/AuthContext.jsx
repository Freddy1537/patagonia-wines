
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Mantener sesión desde localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.get(
        `https://687e925fefe65e5200870c71.mockapi.io/usuarios?email=${email}`
      );
      const user = response.data[0];

      if (user && user.password === password) {
        setUsuario(user);
        localStorage.setItem("usuario", JSON.stringify(user));
        return { exito: true };
      } else {
        return { exito: false, mensaje: "Credenciales incorrectas" };
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      return { exito: false, mensaje: "Error de conexión" };
    }
  };

  // Registro
  const register = async (nombre, email, password, rol = "cliente") => {
    try {
      const nuevoUsuario = { nombre, email, password, rol };
      const response = await axios.post(
        "https://687e925fefe65e5200870c71.mockapi.io/usuarios",
        nuevoUsuario
      );
      setUsuario(response.data);
      localStorage.setItem("usuario", JSON.stringify(response.data));
      return { exito: true };
    } catch (error) {
      console.error("Error al registrar usuario", error);
      return { exito: false, mensaje: "No se pudo registrar" };
    }
  };

  // Logout
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
