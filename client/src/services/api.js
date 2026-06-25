import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the JWT token (if present) to every outgoing request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is invalid/expired, clear the session
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(err);
  }
);

/* ---------------- Auth ---------------- */
export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);

/* ---------------- Events ---------------- */
export const getEvents = (params) => api.get("/events", { params });
export const getEventById = (id) => api.get(`/events/${id}`);
export const createEvent = (data) => api.post("/events", data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

/* ---------------- Registrations ---------------- */
export const registerForEvent = (eventId) => api.post(`/register/${eventId}`);
export const getMyRegistrations = () => api.get("/my-registrations");
export const cancelRegistration = (id) => api.delete(`/register/${id}`);
export const getEventParticipants = (eventId) =>
  api.get(`/events/${eventId}/participants`);

/* ---------------- Notifications ---------------- */
export const getNotifications = () => api.get("/notifications");
export const createAnnouncement = (data) => api.post("/notifications", data);

/* ---------------- Dashboard ---------------- */
export const getAdminStats = () => api.get("/admin/stats");

export default api;
