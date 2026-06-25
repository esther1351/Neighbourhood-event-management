import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-pin" />
          Notice Board
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/about">About</NavLink>
          {user && !isAdmin && (
            <>
              <NavLink to="/my-events">My Events</NavLink>
              <NavLink to="/notifications">Updates</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </>
          )}
          {isAdmin && (
            <NavLink to="/admin">
              Admin<span className="nav-tag">staff</span>
            </NavLink>
          )}
          {user ? (
            <button className="btn btn-sm btn-ghost" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
              <Link to="/register" className="btn btn-sm btn-pin">
                Join
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
