# Around the U.S.

A full-stack photo sharing app built for the [TripleTen](https://tripleten.com/) Software Engineering program.

Users can register, log in, edit their profile, and share photo cards. The React frontend talks to a custom Express API. Data lives in MongoDB. Sessions use a short-lived JWT plus an httpOnly refresh cookie.

| | |
|---|---|
| **Live Application** | [sharearound.vercel.app](https://sharearound.vercel.app/) |
---

## Features

- Register and log in
- Stay logged in after a page refresh (refresh token cookie)
- Log out and clear the session
- View a gallery of photo cards
- Add a card with a title and image URL
- Like and unlike cards
- Delete cards you own
- Edit name, bio, and avatar
- Protected home route (only for logged-in users)

---

## Tech stack

**Frontend** (`frontend/`)

- React 19 (function components and hooks)
- Vite
- React Router
- Context API for the current user

**Backend** (`backend/`)

- Node.js and Express 5
- MongoDB and Mongoose
- JWT (`jsonwebtoken`) and bcrypt
- Celebrate / Joi for request validation
- CORS, cookie-parser, Winston logging

**Deploy**

- Frontend on [Vercel](https://vercel.com)
- Backend on [Render](https://render.com)
- Database on [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## How the two apps talk

```
Browser (Vercel)                  API (Render)                 MongoDB Atlas
─────────────────                 ────────────                 ─────────────
Register / login  ──────────────►  POST /signup, /signin
                                      │
                                      ├── access token (JSON)
                                      └── refresh cookie (httpOnly)
                                      │
GET /users/me, /cards  ─────────────►  Auth middleware
                                      (Bearer access token)
                                      │
Access token expired  ──────────────►  POST /refresh
                                      (cookie) → new access token
```

- **Access token** — sent as `Authorization: Bearer ...`. Short life (5 minutes).
- **Refresh token** — httpOnly cookie. Used only on `/refresh`. Not readable by JavaScript.
- The frontend origin and the API origin are different, so CORS must allow the Vercel URL and `credentials: true`.

---

## Project structure

```
web_project_api_full/
├── frontend/                 # React + Vite app
│   ├── public/               # Static files (favicon, images)
│   └── src/
│       ├── components/       # UI (Header, Main, Card, popups, auth pages)
│       ├── contexts/         # CurrentUserContext
│       ├── layouts/
│       └── utils/            # Api class + auth helpers
└── backend/                  # Express API
    ├── app.js                # Server, CORS, middleware, routes
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middlewares/
    └── errors/
```

Folder-specific notes: [frontend/README.md](frontend/README.md) · [backend/README.md](backend/README.md)

---

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB locally **or** a MongoDB Atlas connection string

Clone the repo, then use **two terminals**: one for the API, one for the React app.

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env` (this file is gitignored — never commit secrets):

```env
DB_URL=mongodb://localhost:27017/aroundb
JWT_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
CLIENT_URL=http://localhost:3000
```

`CLIENT_URL` must be the frontend **origin only** (scheme + host, no path such as `/signin`).

```bash
npm run dev
```

The API runs at **http://localhost:3001**.

### 2. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env` from the example:

```env
VITE_BACKEND_URL=http://localhost:3001
```

Vite only exposes variables that start with `VITE_`. Restart the dev server after changing `.env`.

```bash
npm run dev
```

The app opens at **http://localhost:3000**.

---

## Environment variables

### Backend

| Variable | Purpose |
|---|---|
| `DB_URL` | MongoDB connection string |
| `JWT_SECRET` | Signs the access token |
| `JWT_REFRESH_SECRET` | Signs the refresh token |
| `CLIENT_URL` | Allowed CORS origin (your frontend URL) |
| `PORT` | Server port (Render sets this; local default is `3001`) |
| `NODE_ENV` | `production` on Render so cookies can use `Secure` |

### Frontend

| Variable | Purpose |
|---|---|
| `VITE_BACKEND_URL` | Base URL of the Express API |

On **Vercel**, set `VITE_BACKEND_URL` and **redeploy** (Vite bakes this in at build time).

On **Render**, set the backend variables in the dashboard. Root Directory must be `backend`. Start command: `npm start`.

---

## API

Auth routes are public. `/users` and `/cards` require a valid access token.

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Create an account (`email`, `password`) |
| POST | `/signin` | Log in; returns `{ token }` and sets the refresh cookie |
| POST | `/refresh` | New access token (uses the cookie) |
| POST | `/logout` | Clear cookie and stored refresh token |

### Users (protected)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | All users |
| GET | `/users/me` | Current user |
| GET | `/users/:userId` | One user by id |
| PATCH | `/users/me` | Update name and about |
| PATCH | `/users/me/avatar` | Update avatar URL |
| DELETE | `/users/:userId` | Delete a user |

### Cards (protected)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cards` | All cards |
| POST | `/cards` | Create a card |
| DELETE | `/cards/:cardId` | Delete a card (owner only) |
| PUT | `/cards/:cardId/likes` | Like a card |
| DELETE | `/cards/:cardId/likes` | Unlike a card |

### Typical error status codes

| Status | Meaning |
|---|---|
| 400 | Invalid data |
| 401 | Missing or invalid token |
| 403 | Not allowed (for example, deleting someone else’s card) |
| 404 | User, card, or route not found |
| 500 | Unexpected server error |

---

## Scripts

**Backend**

| Command | Description |
|---|---|
| `npm start` | Start with Node |
| `npm run dev` | Start with Nodemon |
| `npm run lint` | ESLint |

**Frontend**

| Command | Description |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` | ESLint |

---

## Author

Built as the Around the U.S. full-stack project for TripleTen.
