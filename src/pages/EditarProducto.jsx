import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    nombre: "",
    bodega: "",
    precio: "",
    imagen: "",
    variedad: "",
    crianza: "",
    guarda: "",
    notas: "",
    maridaje: "",
  });

  useEffect(() => {
    axios
      .get(`https://687e925fefe65e5200870c71.mockapi.io/productos/${id}`)
      .then((res) => setProducto(res.data))
      .catch((err) => console.error("Error al cargar producto:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://687e925fefe65e5200870c71.mockapi.io/productos/${id}`, producto)
      .then(() => navigate("/productos"))
      .catch((err) => console.error("Error al actualizar:", err));
  };

  return (
    <Container className="mt-4">
      <h2>Editar Producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bodega</Form.Label>
          <Form.Control
            type="text"
            name="bodega"
            value={producto.bodega}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen (ruta relativa o URL)</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Variedad</Form.Label>
          <Form.Control
            type="text"
            name="variedad"
            value={producto.variedad}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Crianza</Form.Label>
          <Form.Control
            type="text"
            name="crianza"
            value={producto.crianza}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Guarda</Form.Label>
          <Form.Control
            type="text"
            name="guarda"
            value={producto.guarda}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notas</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notas"
            value={producto.notas}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maridaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="maridaje"
            value={producto.maridaje}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarProducto;
