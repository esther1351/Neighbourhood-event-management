import React, { useEffect, useState } from "react";
import { getNotifications } from "../../services/api";
import DashTabs from "../../components/DashTabs.jsx";
import Loader from "../../components/Loader.jsx";

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications()
      .then((res) => setItems(res.data?.notifications || res.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">Account</p>
        <h1>Updates</h1>
      </div>
      <div className="dash-layout">
        <DashTabs role="user" />
        <div>
          {loading ? (
            <Loader />
          ) : items.length === 0 ? (
            <div className="empty-state">No updates yet. New event announcements will show up here.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((n) => (
                <div className="card" key={n._id}>
                  <p className="eyebrow">
                    {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""}
                  </p>
                  <p style={{ margin: 0 }}>{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
