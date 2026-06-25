import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEvent, getEvents } from "../../services/api";
import DashTabs from "../../components/DashTabs.jsx";
import Loader from "../../components/Loader.jsx";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    getEvents()
      .then((res) => setEvents(res.data?.events || res.data || []))
      .catch(() => setError("Couldn't load events."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event? This can't be undone.")) return;
    try {
      await deleteEvent(id);
      setEvents((evs) => evs.filter((e) => e._id !== id));
    } catch {
      setError("Couldn't delete that event.");
    }
  };

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Manage events</h1>
      </div>
      <div className="dash-layout">
        <DashTabs role="admin" />
        <div>
          <div className="toolbar">
            <Link to="/admin/events/new" className="btn btn-primary btn-sm">
              + Add event
            </Link>
          </div>
          {error && <div className="form-error">{error}</div>}
          {loading ? (
            <Loader />
          ) : events.length === 0 ? (
            <div className="empty-state">
              No events yet. <Link to="/admin/events/new">Create one</Link>.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Registered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <tr key={ev._id}>
                    <td>{ev.title}</td>
                    <td>{ev.date}</td>
                    <td>{ev.venue}</td>
                    <td>
                      <Link to={`/admin/events/${ev._id}/participants`}>
                        {ev.registeredCount ?? 0} / {ev.capacity ?? "∞"}
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => handleDelete(ev._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
