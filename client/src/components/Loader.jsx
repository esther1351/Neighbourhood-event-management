import React from "react";

export default function Loader({ label = "Loading…" }) {
  return (
    <div className="center-text muted" style={{ padding: "48px 0" }}>
      {label}
    </div>
  );
}
