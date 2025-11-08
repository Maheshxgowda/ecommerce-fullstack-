import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container } from "react-bootstrap";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/products/").then((res) => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    alert(`${product.name} added to cart`);
  };

  return (
    <Container>
      <h2 className="text-center mb-4 fw-bold">🛍️ Available Products</h2>
      <Row xs={1} md={3} className="g-4">
        {products.map((p) => (
          <Col key={p.id}>
            <Card className="shadow-lg border-0 h-100 hover-glow">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text className="fw-bold text-success fs-5">₹{p.price}</Card.Text>
                </div>
                <Button variant="primary" onClick={() => addToCart(p)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
