import React, { useEffect, useMemo, useState } from "react";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard.jsx";
import Loader from "../components/Loader.jsx";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getEvents()
      .then((res) => setEvents(res.data?.events || res.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const set = new Set(events.map((e) => e.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [events]);

  const filtered = events.filter((ev) => {
    const matchesSearch =
      !search ||
      ev.title?.toLowerCase().includes(search.toLowerCase()) ||
      ev.venue?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || ev.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">What's on</p>
        <h1>Upcoming events</h1>
      </div>

      <div className="toolbar">
        <input
          placeholder="Search by title or venue…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All categories" : c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <div className="empty-state">No events match your search.</div>
      ) : (
        <div className="notice-grid">
          {filtered.map((ev) => (
            <EventCard key={ev._id} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
}
