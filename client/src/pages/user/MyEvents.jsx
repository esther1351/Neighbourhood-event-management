import React, { useEffect, useState } from "react";
import { cancelRegistration, getMyRegistrations } from "../../services/api";
import EventCard from "../../components/EventCard.jsx";
import DashTabs from "../../components/DashTabs.jsx";
import Loader from "../../components/Loader.jsx";

export default function MyEvents() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getMyRegistrations()
      .then((res) => setRegistrations(res.data?.registrations || res.data || []))
      .catch(() => setError("Couldn't load your registrations."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCancel = async (id) => {
    try {
      await cancelRegistration(id);
      setRegistrations((regs) => regs.filter((r) => r._id !== id));
    } catch {
      setError("Couldn't cancel that registration.");
    }
  };

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">Account</p>
        <h1>My events</h1>
      </div>
      <div className="dash-layout">
        <DashTabs role="user" />
        <div>
          {error && <div className="form-error">{error}</div>}
          {loading ? (
            <Loader />
          ) : registrations.length === 0 ? (
            <div className="empty-state">
              You haven't registered for any events yet.
            </div>
          ) : (
            <div className="notice-grid">
              {registrations.map((reg) => {
                const ev = reg.eventId && typeof reg.eventId === "object" ? reg.eventId : reg.event;
                if (!ev) return null;
                return (
                  <div key={reg._id}>
                    <EventCard event={ev} registered />
                    <button
                      className="btn btn-sm btn-ghost"
                      style={{ marginTop: 8 }}
                      onClick={() => handleCancel(reg._id)}
                    >
                      Cancel registration
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
