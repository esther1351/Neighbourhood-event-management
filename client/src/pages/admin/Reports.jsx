import React, { useEffect, useState } from "react";
import { getAdminStats, getEvents } from "../../services/api";
import DashTabs from "../../components/DashTabs.jsx";
import Loader from "../../components/Loader.jsx";

export default function Reports() {
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminStats().catch(() => ({ data: null })),
      getEvents().catch(() => ({ data: [] })),
    ]).then(([statsRes, eventsRes]) => {
      setStats(statsRes.data);
      setEvents(eventsRes.data?.events || eventsRes.data || []);
      setLoading(false);
    });
  }, []);

  const byCategory = events.reduce((acc, ev) => {
    const cat = ev.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const mostPopular = [...events]
    .sort((a, b) => (b.registeredCount || 0) - (a.registeredCount || 0))
    .slice(0, 5);

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Reports &amp; analytics</h1>
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
                  <div className="value">{stats?.totalEvents ?? events.length}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Total registrations</div>
                  <div className="value">{stats?.totalRegistrations ?? "—"}</div>
                </div>
                <div className="stat-card">
                  <div className="label">Avg. fill rate</div>
                  <div className="value">{stats?.avgFillRate ? `${stats.avgFillRate}%` : "—"}</div>
                </div>
              </div>

              <div className="section-head" style={{ marginTop: 0 }}>
                <h2>Events by category</h2>
              </div>
              <table className="data-table" style={{ marginBottom: 32 }}>
                <thead>
                  <tr><th>Category</th><th>Count</th></tr>
                </thead>
                <tbody>
                  {Object.entries(byCategory).map(([cat, count]) => (
                    <tr key={cat}><td>{cat}</td><td>{count}</td></tr>
                  ))}
                </tbody>
              </table>

              <div className="section-head" style={{ marginTop: 0 }}>
                <h2>Most popular events</h2>
              </div>
              <table className="data-table">
                <thead>
                  <tr><th>Title</th><th>Registered</th><th>Capacity</th></tr>
                </thead>
                <tbody>
                  {mostPopular.map((ev) => (
                    <tr key={ev._id}>
                      <td>{ev.title}</td>
                      <td>{ev.registeredCount ?? 0}</td>
                      <td>{ev.capacity ?? "∞"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
