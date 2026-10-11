# myapp

Next.js (App Router) + SQLite via `better-sqlite3`. Node only, no Python.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Layout

- `lib/db.js` – SQLite connection, schema, and query helpers
- `app/page.js` – server component that reads from the DB
- `app/api/todos/` – REST route handlers (GET, POST, PATCH, DELETE)
- `components/TodoApp.js` – client component calling the API
- `data/` – SQLite file lives here (git-ignored)

## Scripts

- `npm run dev` / `build` / `start`
- `npm run db:reset` – delete the local database file

## Notes

- `better-sqlite3` ships prebuilt binaries for current Node LTS on macOS, Linux, and Windows, so no compiler or Python is needed. Use an active LTS Node version (20, 22, or 24).
- Deploy to a host with a persistent disk (VPS, Fly.io volume, Railway volume). Serverless hosts like Vercel have no writable persistent filesystem.
- Add a new table in `lib/db.js` inside the `db.exec` block, then add helpers alongside `todos`.
