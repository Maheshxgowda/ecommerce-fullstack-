import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ShippingPage() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    const shippingData = { address, city, postal, country };
    localStorage.setItem("shipping", JSON.stringify(shippingData));
    navigate("/checkout");
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h3 className="fw-bold text-center mb-3">📦 Shipping Address</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control value={postal} onChange={(e) => setPostal(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} />
          </Form.Group>
          <Button variant="success" onClick={handleNext}>
            Continue to Checkout →
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
