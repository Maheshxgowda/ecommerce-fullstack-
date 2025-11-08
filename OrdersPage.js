import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("http://127.0.0.1:8000/api/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to fetch orders"));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="fw-bold text-center">📦 Your Orders</h2>
      {orders.map((o) => (
        <Card key={o.id} className="my-3 shadow-sm border-0">
          <Card.Body>
            <p><strong>Order ID:</strong> {o.id}</p>
            <p><strong>Status:</strong> {o.status}</p>
            <p><strong>Total:</strong> ₹{o.total_price}</p>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
