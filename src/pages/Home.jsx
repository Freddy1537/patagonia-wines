import React from "react";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/img/vinos.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "#fff"
      }}
    >
      <Helmet>
        <title>Inicio | Patagonia Wines</title>
        <meta
          name="description"
          content="Bienvenido a la mejor tienda de vinos de la Patagonia."
        />
      </Helmet>

      <Container className="pt-5">
        <h1>Bienvenido a Patagonia Wines 🍷</h1>
        <p>
          Explorá nuestra selección de vinos únicos de alta gama, directos desde
          las bodegas de la Patagonia argentina.
        </p>
      </Container>
    </div>
  );
};

export default Home;
