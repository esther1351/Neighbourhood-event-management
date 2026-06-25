import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../services/api";
import DashTabs from "../../components/DashTabs.jsx";

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "",
  date: "",
  time: "",
  venue: "",
  capacity: "",
};

export default function AddEvent() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await createEvent({ ...form, capacity: Number(form.capacity) || undefined });
      setSuccess("Event created.");
      setForm(EMPTY_FORM);
      setTimeout(() => navigate("/admin/events"), 700);
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't create the event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Add a new event</h1>
      </div>
      <div className="dash-layout">
        <DashTabs role="admin" />
        <div className="card" style={{ maxWidth: 560 }}>
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" required value={form.title} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="category">Category</label>
                <input id="category" name="category" value={form.category} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="capacity">Capacity</label>
                <input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min={1}
                  value={form.capacity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="date">Date</label>
                <input id="date" name="date" type="date" required value={form.date} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="time">Time</label>
                <input id="time" name="time" type="time" value={form.time} onChange={handleChange} />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="venue">Venue</label>
              <input id="venue" name="venue" required value={form.venue} onChange={handleChange} />
            </div>
            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Creating…" : "Create event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
