import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        "https://687e925fefe65e5200870c71.mockapi.io/productos"
      );
      setProductos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await axios.delete(
        `https://687e925fefe65e5200870c71.mockapi.io/productos/${id}`
      );
      setProductos((prev) => prev.filter((producto) => producto.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Productos | Patagonia Wines</title>
        <meta
          name="description"
          content="Explorá todos los vinos disponibles en Patagonia Wines."
        />
      </Helmet>

      <h2 className="mb-4">Nuestros Vinos</h2>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {productos.map((producto) => (
            <Col key={producto.id}>
              <ProductCard
                producto={producto}
                onEliminar={handleEliminar}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Productos;
