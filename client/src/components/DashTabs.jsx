import React from "react";
import { NavLink } from "react-router-dom";

const USER_LINKS = [
  { to: "/profile", label: "Profile" },
  { to: "/my-events", label: "My events" },
  { to: "/notifications", label: "Updates" },
];

const ADMIN_LINKS = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/events/new", label: "Add event" },
  { to: "/admin/events", label: "Manage events" },
  { to: "/admin/reports", label: "Reports" },
];

export default function DashTabs({ role = "user" }) {
  const links = role === "admin" ? ADMIN_LINKS : USER_LINKS;
  return (
    <aside className="dash-sidebar">
      {links.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end}>
          {l.label}
        </NavLink>
      ))}
    </aside>
  );
}
