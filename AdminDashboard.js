import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("http://127.0.0.1:8000/api/admin/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data));
  }, []);

  const markShipped = async (id) => {
    const token = localStorage.getItem("access_token");
    await axios.put(
      `http://127.0.0.1:8000/api/admin/orders/${id}/status/`,
      { status: "Shipped" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Order marked as shipped!");
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Dashboard</h2>
      {orders.map((o) => (
        <div key={o.id}>
          <p>Order ID: {o.id}</p>
          <p>Status: {o.status}</p>
          <button onClick={() => markShipped(o.id)}>Mark Shipped</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
