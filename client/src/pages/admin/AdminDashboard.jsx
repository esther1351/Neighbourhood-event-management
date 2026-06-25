import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminStats, getEvents } from "../../services/api";
import DashTabs from "../../components/DashTabs.jsx";
import Loader from "../../components/Loader.jsx";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminStats().catch(() => ({ data: null })),
      getEvents({ limit: 5 }).catch(() => ({ data: [] })),
    ]).then(([statsRes, eventsRes]) => {
      setStats(statsRes.data);
      setRecentEvents(eventsRes.data?.events || eventsRes.data || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Dashboard overview</h1>
      </div>
      <div className="dash-layout">
        <DashTabs role="admin" />
        <div>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="stat-grid">
                <div className="stat-card">
                  <div className="label">Total events</div>
                  <div className="value">{stats?.totalEvents ?? "—"}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Total users</div>
                  <div className="value">{stats?.totalUsers ?? "—"}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Total registrations</div>
                  <div className="value">{stats?.totalRegistrations ?? "—"}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Upcoming events</div>
                  <div className="value">{stats?.upcomingEvents ?? "—"}</div>
                </div>
              </div>

              <div className="section-head" style={{ marginTop: 0 }}>
                <h2>Recent events</h2>
                <Link to="/admin/events">Manage all →</Link>
              </div>
              {recentEvents.length === 0 ? (
                <div className="empty-state">
                  No events yet. <Link to="/admin/events/new">Create your first one</Link>.
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Venue</th>
                      <th>Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEvents.map((ev) => (
                      <tr key={ev._id}>
                        <td><Link to={`/admin/events`}>{ev.title}</Link></td>
                        <td>{ev.date}</td>
                        <td>{ev.venue}</td>
                        <td>{ev.registeredCount ?? 0} / {ev.capacity ?? "∞"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
