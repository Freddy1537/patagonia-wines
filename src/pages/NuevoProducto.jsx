import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const NuevoProducto = () => {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    bodega: "",
    precio: "",
    imagen: "",
    variedad: "",
    crianza: "",
    guarda: "",
    notas: "",
    maridaje: ""
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const validar = () => {
    if (!formulario.nombre.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!formulario.precio || isNaN(formulario.precio) || Number(formulario.precio) <= 0) {
      return "El precio debe ser un número mayor a 0.";
    }
    if (!formulario.notas || formulario.notas.trim().length < 10) {
      return "Las notas deben tener al menos 10 caracteres.";
    }
    if (!formulario.maridaje || formulario.maridaje.trim().length < 10) {
      return "El maridaje debe tener al menos 10 caracteres.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorValidacion = validar();

    if (errorValidacion) {
      toast.error(errorValidacion);
      return;
    }

    try {
      await axios.post("https://687e925fefe65e5200870c71.mockapi.io/productos", {
        ...formulario,
        precio: Number(formulario.precio)
      });
      toast.success("Producto creado exitosamente");
      navigate("/productos");
    } catch (error) {
      console.error("Error al crear producto", error);
      toast.error("Error al crear el producto");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Nuevo Producto</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bodega</Form.Label>
          <Form.Control
            type="text"
            name="bodega"
            value={formulario.bodega}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={formulario.precio}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            type="text"
            name="imagen"
            value={formulario.imagen}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Variedad</Form.Label>
          <Form.Control
            type="text"
            name="variedad"
            value={formulario.variedad}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Crianza</Form.Label>
          <Form.Control
            type="text"
            name="crianza"
            value={formulario.crianza}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Guarda</Form.Label>
          <Form.Control
            type="text"
            name="guarda"
            value={formulario.guarda}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notas</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="notas"
            value={formulario.notas}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Maridaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="maridaje"
            value={formulario.maridaje}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Producto
        </Button>
      </Form>
    </Container>
  );
};

export default NuevoProducto;

