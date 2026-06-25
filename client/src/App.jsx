import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Events from "./pages/Events.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import Profile from "./pages/user/Profile.jsx";
import MyEvents from "./pages/user/MyEvents.jsx";
import Notifications from "./pages/user/Notifications.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AddEvent from "./pages/admin/AddEvent.jsx";
import ManageEvents from "./pages/admin/ManageEvents.jsx";
import ViewParticipants from "./pages/admin/ViewParticipants.jsx";
import Reports from "./pages/admin/Reports.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Resident dashboard */}
          <Route
            path="/profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="/my-events"
            element={<ProtectedRoute><MyEvents /></ProtectedRoute>}
          />
          <Route
            path="/notifications"
            element={<ProtectedRoute><Notifications /></ProtectedRoute>}
          />

          {/* Admin dashboard */}
          <Route
            path="/admin"
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />
          <Route
            path="/admin/events/new"
            element={<AdminRoute><AddEvent /></AdminRoute>}
          />
          <Route
            path="/admin/events"
            element={<AdminRoute><ManageEvents /></AdminRoute>}
          />
          <Route
            path="/admin/events/:eventId/participants"
            element={<AdminRoute><ViewParticipants /></AdminRoute>}
          />
          <Route
            path="/admin/reports"
            element={<AdminRoute><Reports /></AdminRoute>}
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
      <p className="eyebrow">404</p>
      <h1>This notice has been taken down.</h1>
      <p className="muted">The page you're looking for doesn't exist.</p>
    </div>
  );
}
