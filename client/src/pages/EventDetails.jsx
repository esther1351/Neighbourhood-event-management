import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  cancelRegistration,
  getEventById,
  getMyRegistrations,
  registerForEvent,
} from "../services/api";
import Loader from "../components/Loader.jsx";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [myRegistration, setMyRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getEventById(id)
      .then((res) => {
        if (active) setEvent(res.data?.event || res.data);
      })
      .catch(() => setError("Couldn't load this event."))
      .finally(() => active && setLoading(false));

    if (user) {
      getMyRegistrations()
        .then((res) => {
          const regs = res.data?.registrations || res.data || [];
          const match = regs.find((r) => (r.eventId?._id || r.eventId) === id);
          if (active) setMyRegistration(match || null);
        })
        .catch(() => {});
    }
    return () => {
      active = false;
    };
  }, [id, user]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/events/${id}` } } });
      return;
    }
    setActionLoading(true);
    setError("");
    try {
      const res = await registerForEvent(id);
      setMyRegistration(res.data?.registration || res.data);
      setMessage("You're registered! See you there.");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!myRegistration) return;
    setActionLoading(true);
    setError("");
    try {
      await cancelRegistration(myRegistration._id);
      setMyRegistration(null);
      setMessage("Registration canceled.");
    } catch (err) {
      setError(err?.response?.data?.message || "Couldn't cancel registration.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="container"><Loader /></div>;
  if (!event) {
    return (
      <div className="container">
        <div className="empty-state">{error || "Event not found."}</div>
      </div>
    );
  }

  const spotsLeft =
    event.capacity != null ? event.capacity - (event.registeredCount || 0) : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="page-head">
        <p className="eyebrow">{event.category || "Community"}</p>
        <h1>{event.title}</h1>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="meta" style={{ marginBottom: 14 }}>
          <span>📅 {event.date} {event.time ? `· ${event.time}` : ""}</span>
          <span>📍 {event.venue}</span>
          {event.capacity != null && (
            <span>
              👥 {event.registeredCount || 0} / {event.capacity} registered
            </span>
          )}
        </div>
        <p>{event.description}</p>

        {error && <div className="form-error">{error}</div>}
        {message && <div className="form-success">{message}</div>}

        {myRegistration ? (
          <button
            className="btn btn-danger"
            onClick={handleCancel}
            disabled={actionLoading}
          >
            {actionLoading ? "Canceling…" : "Cancel my registration"}
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleRegister}
            disabled={actionLoading || isFull}
          >
            {actionLoading ? "Registering…" : isFull ? "Event full" : "Register for this event"}
          </button>
        )}
      </div>
    </div>
  );
}
