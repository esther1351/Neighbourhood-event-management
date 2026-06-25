import React from "react";

export default function About() {
  return (
    <div className="container">
      <div className="page-head">
        <p className="eyebrow">About</p>
        <h1>Why this board exists</h1>
      </div>
      <div style={{ maxWidth: 680 }}>
        <p>
          Traditional event coordination in neighborhoods often relies on
          scattered flyers, group chats, and word of mouth — which leads to
          miscommunication, low turnout, scheduling conflicts, and no easy
          way to track who's actually coming.
        </p>
        <p>
          The Neighborhood Event Management System replaces that with a
          single, centralized platform. Residents can browse events, register
          in a couple of clicks, and get notified when details change.
          Organizers get a dashboard to create events, manage capacity, track
          registrations, and see participation trends at a glance.
        </p>
        <p>
          The result: fewer double-bookings, more transparency, and stronger
          participation across the community.
        </p>
      </div>
    </div>
  );
}
