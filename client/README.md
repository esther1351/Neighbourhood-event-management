# Notice Board — Neighborhood Event Management (Frontend)

React frontend for the Neighborhood Event Management System, built with
Vite + React Router + Axios.

## Setup

```bash
cd client
npm install
cp .env.example .env   # set VITE_API_URL to your backend, e.g. http://localhost:5000/api
npm run dev
```

The app runs at `http://localhost:5173` by default and expects a backend
(Node/Express + MongoDB) exposing the routes listed below.

## Pages

- **Public:** Home, About, Events listing, Event details, Login, Register
- **Resident dashboard:** Profile, My events, Updates/notifications
- **Admin dashboard:** Overview, Add event, Manage events, Participants, Reports

## Expected API contract

| Method | Route | Notes |
|---|---|---|
| POST | `/api/auth/register` | returns `{ token, user }` |
| POST | `/api/auth/login` | returns `{ token, user }` |
| GET | `/api/events` | optional `?search=&category=&limit=&upcoming=` |
| GET | `/api/events/:id` | |
| POST | `/api/events` | admin only |
| PUT | `/api/events/:id` | admin only |
| DELETE | `/api/events/:id` | admin only |
| POST | `/api/register/:eventId` | register current user for an event |
| GET | `/api/my-registrations` | current user's registrations |
| DELETE | `/api/register/:id` | cancel a registration |
| GET | `/api/events/:eventId/participants` | admin only |
| GET | `/api/notifications` | |
| POST | `/api/notifications` | admin only |
| GET | `/api/admin/stats` | `{ totalEvents, totalUsers, totalRegistrations, upcomingEvents }` |

Auth is JWT-based: the token returned from login/register is stored in
`localStorage` and attached to every request as `Authorization: Bearer <token>`
(see `src/services/api.js`).

## Notes

- `src/index.css` holds the full design system (colors, type, the "pinned
  notice" card used for events, dashboard styling). Tweak the CSS variables
  at the top of the file to re-theme the whole app.
- Route guards live in `src/components/ProtectedRoute.jsx` (any logged-in
  user) and `src/components/AdminRoute.jsx` (admin role only).
- Swap any of the `services/api.js` calls in once your backend routes are
  live — the components already assume this shape, so no other changes
  should be needed.
