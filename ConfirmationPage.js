import React from "react";
import { Container, Button } from "react-bootstrap";

export default function ConfirmationPage() {
  return (
    <Container className="text-center mt-5">
      <h2 className="fw-bold text-success">✅ Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      <Button variant="primary" onClick={() => (window.location.href = "/orders")}>
        View My Orders
      </Button>
    </Container>
  );
}
