import { todos } from "@/lib/db";
import TodoApp from "@/components/TodoApp";

// Read from SQLite on every request instead of at build time
export const dynamic = "force-dynamic";

export default function Home() {
  const initialTodos = todos.all();

  return (
    <main>
      <h1>Tasks</h1>
      <TodoApp initialTodos={initialTodos} />
    </main>
  );
}
