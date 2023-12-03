import { useState, useEffect } from "react";
import { clsx } from "clsx";

interface Todo {
  uid: string;
  title: string;
  completed: 0 | 1;
}

const API_URL = import.meta.env.PROD
  ? "https://api-shuta13.cloud.okteto.net"
  : "http://localhost:3000";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch(API_URL + "/api/todo")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div className="space-y-4 mx-auto max-w-[768px] px-4">
      <h1 className="text-2xl font-bold">hono-docker-k8s-example</h1>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Todo</h2>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.uid}
              className="flex place-items-center place-content-between bg-gray-100 p-2 rounded-md"
            >
              <div className="flex gap-x-2">
                <input
                  type="checkbox"
                  checked={todo.completed === 1}
                  onChange={async () => {
                    await fetch(API_URL + "/api/todo/" + todo.uid, {
                      method: "PUT",
                      body: JSON.stringify({
                        title: todo.title,
                        completed: todo.completed === 1 ? 0 : 1,
                      }),
                    });
                    const res = await fetch(API_URL + "/api/todo");
                    const data = await res.json();
                    setTodos(data);
                  }}
                />
                <span
                  className={clsx({
                    "line-through": todo.completed === 1,
                  })}
                >
                  {todo.title}
                </span>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await fetch(API_URL + "/api/todo/" + todo.uid, {
                    method: "DELETE",
                  });
                  const res = await fetch(API_URL + "/api/todo");
                  const data = await res.json();
                  setTodos(data);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Add a new task</h2>
        <form
          className="space-y-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await fetch(API_URL + "/api/todo", {
              method: "POST",
              body: JSON.stringify({
                title,
                completed: 0,
              }),
            });
            setTitle("");
            const res = await fetch(API_URL + "/api/todo");
            const data = await res.json();
            setTodos(data);
          }}
        >
          <label htmlFor="title">Type a title</label>
          <input
            name="title"
            type="text"
            className="border w-full px-2"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <div className="flex place-content-end">
            <button type="submit" className="bg-green-200 px-4 py-1">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
