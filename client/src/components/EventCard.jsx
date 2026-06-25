import React from "react";
import { Link } from "react-router-dom";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function EventCard({ event, registered = false }) {
  const spotsLeft =
    typeof event.capacity === "number" && typeof event.registeredCount === "number"
      ? event.capacity - event.registeredCount
      : null;
  const isFull = spotsLeft !== null && spotsLeft <= 0;
  const fillPct =
    event.capacity > 0
      ? Math.min(100, Math.round(((event.registeredCount || 0) / event.capacity) * 100))
      : 0;

  return (
    <article className="notice-card">
      <div className="cat">{event.category || "Community"}</div>
      <h3>
        <Link to={`/events/${event._id}`}>{event.title}</Link>
      </h3>
      <div className="meta">
        <span>📅 {formatDate(event.date)}{event.time ? ` · ${event.time}` : ""}</span>
        <span>📍 {event.venue}</span>
      </div>
      {event.description && (
        <p className="desc">
          {event.description.length > 90
            ? `${event.description.slice(0, 90)}…`
            : event.description}
        </p>
      )}
      {event.capacity ? (
        <div className="capacity-bar">
          <div
            className={`capacity-fill ${isFull ? "full" : ""}`}
            style={{ width: `${fillPct}%` }}
          />
        </div>
      ) : null}
      <div className="notice-card-foot">
        {registered ? (
          <span className="status-pill registered">Registered</span>
        ) : (
          <span className={`status-pill ${isFull ? "full" : "open"}`}>
            {isFull ? "Full" : spotsLeft !== null ? `${spotsLeft} spots left` : "Open"}
          </span>
        )}
        <Link to={`/events/${event._id}`} className="btn btn-sm btn-ghost">
          View
        </Link>
      </div>
    </article>
  );
}
