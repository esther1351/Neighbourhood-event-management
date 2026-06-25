import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/api";
import EventCard from "../components/EventCard.jsx";
import Loader from "../components/Loader.jsx";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents({ limit: 3, upcoming: true })
      .then((res) => setEvents(res.data?.events || res.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Neighborhood Event Management</p>
            <h1>Every notice, one board. Every neighbor, in the loop.</h1>
            <p className="lede">
              Browse what's happening nearby, reserve your spot in a couple of
              clicks, and let organizers handle the rest — no more group-chat
              chaos or double-booked venues.
            </p>
            <div className="hero-actions">
              <Link to="/events" className="btn btn-primary">
                Browse events
              </Link>
              <Link to="/register" className="btn btn-ghost">
                Create an account
              </Link>
            </div>
          </div>
          <div className="corkboard">
            <div className="mini-note">📌 Saturday cleanup — 32 signed up</div>
            <div className="mini-note">📌 Block party — venue confirmed</div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="section-head">
          <h2>Coming up</h2>
          <Link to="/events">See all events →</Link>
        </div>
        {loading ? (
          <Loader />
        ) : events.length === 0 ? (
          <div className="empty-state">
            No events posted yet. Check back soon, or{" "}
            <Link to="/register">sign up</Link> to be notified.
          </div>
        ) : (
          <div className="notice-grid">
            {events.map((ev) => (
              <EventCard key={ev._id} event={ev} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
