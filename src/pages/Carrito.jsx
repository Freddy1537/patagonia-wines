
import React from "react";
import { useCarrito } from "../context/ContextCarrito";
import { Button, Table, Container } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Carrito = () => {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useCarrito();

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Carrito | Patagonia Wines</title>
        <meta
          name="description"
          content="Revisá los productos que seleccionaste antes de finalizar tu compra."
        />
      </Helmet>

      <h2>Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="mt-3">El carrito está vacío.</p>
      ) : (
        <>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>${item.precio}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => disminuirCantidad(item.id)}
                      disabled={item.cantidad <= 1}
                      className="me-2"
                    >
                      -
                    </Button>
                    {item.cantidad}
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => aumentarCantidad(item.id)}
                      className="ms-2"
                    >
                      +
                    </Button>
                  </td>
                  <td>${item.precio * item.cantidad}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end fw-bold">
                  Total:
                </td>
                <td colSpan="2" className="fw-bold">
                  ${calcularTotal()}
                </td>
              </tr>
            </tbody>
          </Table>

          <div className="text-end mt-3">
            <Button variant="outline-danger" onClick={vaciarCarrito}>
              Vaciar carrito
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Carrito;
