"use client";

import { useState } from "react";

export default function TodoApp({ initialTodos }) {
  const [items, setItems] = useState(initialTodos);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  async function addTodo(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();

    if (!res.ok) return setError(data.error || "Could not add task.");
    setItems((prev) => [data, ...prev]);
    setTitle("");
  }

  async function toggle(todo) {
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    }
  }

  async function remove(id) {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <>
      <form onSubmit={addTodo} className="add">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          aria-label="New task"
        />
        <button type="submit">Add task</button>
      </form>
      {error && <p className="error">{error}</p>}

      {items.length === 0 ? (
        <p className="empty">No tasks yet. Add your first one above.</p>
      ) : (
        <ul>
          {items.map((todo) => (
            <li key={todo.id} className={todo.done ? "done" : ""}>
              <label>
                <input type="checkbox" checked={todo.done} onChange={() => toggle(todo)} />
                <span>{todo.title}</span>
              </label>
              <button className="ghost" onClick={() => remove(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
