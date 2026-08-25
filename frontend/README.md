# Around the U.S. — React

A social photo-sharing app built with React as part of the TripleTen Software Engineering program. This project is a full refactor of the original vanilla JavaScript version, migrated to a React component architecture with a live REST API.

## Features

- View a gallery of photo cards fetched from a remote API
- Like and unlike cards with real-time state updates
- Delete cards with a confirmation popup
- Edit your profile name and description
- Update your profile avatar
- Add new photo cards with a title and image URL
- Popup closes on ESC key press or overlay click

## Tech Stack

- **React 19** — function components, hooks (`useState`, `useEffect`, `useContext`, `useCallback`)
- **Vite** — development server and build tool
- **Context API** — `CurrentUserContext` shares user data across the component tree without prop drilling
- **REST API** — all data operations (read, create, update, delete) communicate with a live backend

## Project Structure

```
src/
├── components/
│   ├── App/              # Root component — state, API calls, popup management
│   ├── Main/             # Profile section and card grid
│   ├── Card/             # Individual card with like/delete actions
│   ├── Popup/            # Reusable popup wrapper (ESC + overlay close)
│   ├── EditProfile/      # Edit name and description form
│   ├── EditAvatar/       # Edit avatar URL form
│   ├── NewCard/          # Add new card form
│   ├── RemoveCard/       # Delete confirmation popup content
│   ├── ImagePopup/       # Full-size image viewer
│   ├── Header/           # App header with logo
│   └── Footer/           # App footer
├── contexts/
│   └── CurrentUserContext.js   # React context for current user data
└── utils/
    └── api.js            # Api class with all REST methods + exported instance
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## API

The app connects to the TripleTen Around API:

```
https://around-api.pt-br.tripleten-services.com/v1
```

The `Api` class in `src/utils/api.js` handles all requests. A single configured instance is exported and shared across the app — this follows the Singleton pattern, ensuring one consistent API client throughout.

## Key React Concepts Used

| Concept | Where |
|---|---|
| `useState` | `App` manages `currentUser`, `cards`, `popup` state |
| `useEffect` | Initial data fetch on mount; ESC key listener in `Popup` |
| `useContext` | `CurrentUserContext` consumed in `Main`, `EditProfile`, `EditAvatar`, `NewCard` |
| `useCallback` | Memoized event handlers in `Popup` to prevent unnecessary re-renders |
| Lifting state up | `cards` and `popup` state lifted to `App` so all children can share them |
| Controlled components | All form inputs managed via `useState` |
