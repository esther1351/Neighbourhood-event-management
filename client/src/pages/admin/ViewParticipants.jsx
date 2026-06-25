import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventParticipants } from "../../services/api";
import DashTabs from "../../components/DashTabs.jsx";
import Loader from "../../components/Loader.jsx";

export default function ViewParticipants() {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEventParticipants(eventId)
      .then((res) => setParticipants(res.data?.participants || res.data || []))
      .catch(() => setError("Couldn't load participants."))
      .finally(() => setLoading(false));
  }, [eventId]);

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Participants</h1>
      </div>
      <div className="dash-layout">
        <DashTabs role="admin" />
        <div>
          {error && <div className="form-error">{error}</div>}
          {loading ? (
            <Loader />
          ) : participants.length === 0 ? (
            <div className="empty-state">No one has registered for this event yet.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registered on</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p) => {
                  const u = p.userId && typeof p.userId === "object" ? p.userId : p.user;
                  return (
                    <tr key={p._id}>
                      <td>{u?.name || "—"}</td>
                      <td>{u?.email || "—"}</td>
                      <td>
                        {p.registeredAt
                          ? new Date(p.registeredAt).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
