import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useCarrito } from "../context/ContextCarrito";
import { useAuth } from "../context/AuthContext";

const NavigationBar = () => {
  const { carrito } = useCarrito();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Patagonia Wines 🍷
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nuevo-producto">Nuevo Producto</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/carrito">
              <FaShoppingCart className="me-1" />
              Carrito{" "}
              {totalItems > 0 && (
                <Badge bg="success" pill>
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {usuario ? (
              <>
                <Navbar.Text className="me-3">
                  ¡Hola, {usuario.nombre}!
                </Navbar.Text>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="me-2"
                  onClick={() => navigate("/login")}
                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => navigate("/crear-cuenta")}
                >
                  Crear cuenta
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

