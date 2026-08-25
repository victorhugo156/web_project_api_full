# Around — Express REST API (Backend)

Around is the backend REST API for a social media-style application. It lets
users manage their profiles, create photo cards, and like or unlike cards.
Application data is persisted in MongoDB through Mongoose.

---

## Project Structure

```
web_project_around_express/
├── app.js
├── controllers/
│   ├── cards.js
│   └── users.js
├── errors/
├── middlewares/
├── models/
│   ├── cards.js
│   └── users.js
├── routes/
│   ├── cards.js
│   └── users.js
├── package.json
└── README.md
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express 5 | Web framework / routing |
| MongoDB | Document database |
| Mongoose | MongoDB object modeling and validation |
| ESLint (Airbnb) | Code linting |
| Nodemon | Auto-restart during development |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm
- MongoDB running locally on its default port

### Installation

```bash
npm install
```

### Running the server

**Development** (auto-restarts on file changes):
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server runs on **http://localhost:3000**.
It connects to the `aroundb` MongoDB database.

---

## API Endpoints

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Returns all users |
| GET | `/users/:userId` | Returns one user by ID |
| POST | `/users` | Creates a user |
| PATCH | `/users/me` | Updates the current user's name and about fields |
| PATCH | `/users/me/avatar` | Updates the current user's avatar |
| DELETE | `/users/:userId` | Deletes a user |

---

### Cards

| Method | Endpoint | Description |
|---|---|---|
| GET | `/cards` | Returns all cards |
| POST | `/cards` | Creates a card owned by the current user |
| DELETE | `/cards/:cardId` | Deletes a card |
| PUT | `/cards/:cardId/likes` | Adds the current user's like |
| DELETE | `/cards/:cardId/likes` | Removes the current user's like |

---

### Error Responses

| Status | Meaning |
|---|---|
| 400 | Invalid request data or malformed ID |
| 404 | User, card, or route not found |
| 500 | Unexpected server error |

Error responses contain a single `message` property:

```json
{
  "message": "Route not found"
}
```

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start server with Node |
| `npm run dev` | Start server with Nodemon (watch mode) |
| `npm run lint` | Run ESLint checks |
