import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const dbPath = path.resolve(process.cwd(), process.env.DATABASE_PATH || "./data/app.db");
const g = globalThis;

function getDb() {
  if (g.__db) return g.__db;

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  db.pragma("busy_timeout = 5000");
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT    NOT NULL,
      done       INTEGER NOT NULL DEFAULT 0,
      created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );
  `);

  g.__db = db;
  return db;
}

const toTodo = (row) => (row ? { ...row, done: Boolean(row.done) } : null);

export const todos = {
  all: () => getDb().prepare("SELECT * FROM todos ORDER BY id DESC").all().map(toTodo),
  get: (id) => toTodo(getDb().prepare("SELECT * FROM todos WHERE id = ?").get(id)),
  create: (title) => {
    const info = getDb().prepare("INSERT INTO todos (title) VALUES (?)").run(title);
    return todos.get(info.lastInsertRowid);
  },
  update: (id, { title, done }) => {
    const current = todos.get(id);
    if (!current) return null;
    getDb()
      .prepare("UPDATE todos SET title = ?, done = ? WHERE id = ?")
      .run(title ?? current.title, (done ?? current.done) ? 1 : 0, id);
    return todos.get(id);
  },
  remove: (id) => getDb().prepare("DELETE FROM todos WHERE id = ?").run(id).changes > 0,
};