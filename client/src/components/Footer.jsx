import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Notice Board — Neighborhood Event Management</span>
        <span>Built for stronger, more connected communities.</span>
      </div>
    </footer>
  );
}
