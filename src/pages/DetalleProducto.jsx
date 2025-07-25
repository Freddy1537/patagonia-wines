
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCarrito } from "../context/ContextCarrito";
import { Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(
          `https://687e925fefe65e5200870c71.mockapi.io/productos/${id}`
        );
        setProducto(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };
    obtenerProducto();
  }, [id]);

  const handleAgregar = () => {
    if (producto) {
      agregarAlCarrito(producto, cantidad);
    }
  };

  const incrementar = () => setCantidad((prev) => prev + 1);
  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <Spinner animation="border" className="mt-5" />;

  return (
    <div className="container mt-5">
      <Card className="p-4">
        <div className="row">
          <div className="col-md-6 text-center">
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.nombre}
              style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text><strong>Bodega:</strong> {producto.bodega}</Card.Text>
              <Card.Text><strong>Precio:</strong> ${producto.precio}</Card.Text>
              <Card.Text><strong>Variedad:</strong> {producto.variedad}</Card.Text>
              <Card.Text><strong>Crianza:</strong> {producto.crianza}</Card.Text>
              <Card.Text><strong>Guarda:</strong> {producto.guarda}</Card.Text>
              <Card.Text><strong>Notas:</strong> {producto.notas}</Card.Text>
              <Card.Text><strong>Maridaje:</strong> {producto.maridaje}</Card.Text>

              <div className="d-flex align-items-center my-3">
                <Button variant="outline-secondary" onClick={decrementar}>-</Button>
                <span className="mx-3">{cantidad}</span>
                <Button variant="outline-secondary" onClick={incrementar}>+</Button>
              </div>

              <Button variant="primary" onClick={handleAgregar}>
                Agregar al carrito
              </Button>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DetalleProducto;
