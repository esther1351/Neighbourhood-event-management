import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import DashTabs from "../../components/DashTabs.jsx";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">Account</p>
        <h1>My profile</h1>
      </div>
      <div className="dash-layout">
        <DashTabs role="user" />
        <div>
          <div className="card" style={{ maxWidth: 460 }}>
            <div className="form-field">
              <label>Name</label>
              <input value={user?.name || ""} disabled />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input value={user?.email || ""} disabled />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input value={user?.phone || "—"} disabled />
            </div>
            <p className="muted" style={{ fontSize: "0.85rem" }}>
              Profile editing can be wired up to a future{" "}
              <code>PUT /api/users/me</code> endpoint.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
