import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { Container, Card, Button, ListGroup } from "react-bootstrap";

export default function CheckoutPage() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const shipping = JSON.parse(localStorage.getItem("shipping") || "{}");
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  const navigate = useNavigate();

  const placeOrder = async () => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/orders/",
        {
          orderItems: cart.map((p) => ({
            product: p.id,
            qty: 1,
            price: p.price,
          })),
          shippingAddress: shipping,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("cart");
      localStorage.removeItem("shipping");
      navigate("/confirmation");
    } catch (error) {
      alert("Failed to place order");
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-lg">
        <h3 className="fw-bold text-center mb-4">💳 Checkout</h3>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Shipping:</strong> {shipping.address}, {shipping.city},{" "}
            {shipping.postal}, {shipping.country}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Items:</strong>
            <ul>
              {cart.map((p) => (
                <li key={p.id}>
                  {p.name} – ₹{p.price}
                </li>
              ))}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Total: ₹{total}</strong>
          </ListGroup.Item>
        </ListGroup>
        <div className="text-center mt-4">
          <Button variant="success" onClick={placeOrder}>
            Place Order ✅
          </Button>
        </div>
      </Card>
    </Container>
  );
}
