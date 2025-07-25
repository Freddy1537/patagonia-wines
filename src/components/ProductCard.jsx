import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/ContextCarrito";

const ProductCard = ({ producto, onEliminar }) => {
  const { agregarAlCarrito } = useCarrito();
  const [showModal, setShowModal] = useState(false);

  const handleAgregar = () => {
    agregarAlCarrito(producto, 1);
  };

  const confirmarEliminacion = () => {
    onEliminar(producto.id);
    setShowModal(false);
  };

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          src={producto.imagen}
          alt={producto.nombre}
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>Bodega: {producto.bodega}</Card.Text>
          <Card.Text>Precio: ${producto.precio}</Card.Text>

          <div className="mt-auto d-flex gap-2 flex-wrap">
            <Link to={`/detalle/${producto.id}`} className="flex-grow-1">
              <Button variant="outline-primary" size="sm" className="w-100">
                Ver más
              </Button>
            </Link>
            <Button
              variant="success"
              size="sm"
              className="flex-grow-1"
              onClick={handleAgregar}
            >
              Agregar
            </Button>
            {onEliminar && (
              <Button
                variant="danger"
                size="sm"
                className="flex-grow-1"
                onClick={() => setShowModal(true)}
              >
                Eliminar
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que querés eliminar <strong>{producto.nombre}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminacion}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
