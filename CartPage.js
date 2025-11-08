import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Button, Form } from "react-bootstrap";

export default function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
  const [address, setAddress] = useState("");
  const navigate = useNavigate();


  const total = cart.reduce((sum, p) => sum + p.price, 0);

  const placeOrder = async () => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/orders/",
        {
          orderItems: cart.map((p) => ({ product: p.id, qty: 1, price: p.price })),
          shippingAddress: { address },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      window.location.href = "/orders";
    } catch {
      alert("Failed to place order");
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="fw-bold text-center">🛒 Your Cart</h2>
      {cart.map((p) => (
        <Card key={p.id} className="my-2 shadow-sm">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <Card.Title>{p.name}</Card.Title>
              <Card.Text>₹{p.price}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      ))}

      <h4 className="mt-4">Total: ₹{total}</h4>
<Button
  variant="primary"
  className="mt-3"
  onClick={() => navigate("/shipping")}
>
  Proceed to Shipping →
</Button>
    </Container>
  );
}
