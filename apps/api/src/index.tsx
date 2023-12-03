import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { todoController } from "@/controller/todo-controller";

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: ["http://localhost:8080", "https://web-shuta13.cloud.okteto.net"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (c) => {
  return c.text("Health OK");
});

app.get("/api/todo", async (c) => {
  const todos = await todoController.read({});
  if (todos.status === "ok") {
    return c.json(todos.data);
  } else {
    c.status(500);
    return c.json(todos.error);
  }
});

app.post("/api/todo", async (c) => {
  const data = await c.req.json();
  const uid = crypto.randomUUID();
  const result = await todoController.create({
    uid,
    ...data,
  });
  if (result.status === "ok") {
    return c.json(result.data);
  } else {
    c.status(500);
    return c.json(result.error);
  }
});

app.put("/api/todo/:uid", async (c) => {
  const uid = c.req.param("uid");
  const data = await c.req.json();
  const result = await todoController.update({ uid, ...data });
  if (result.status === "ok") {
    return c.json(result.data);
  } else {
    c.status(500);
    return c.json(result.error);
  }
});

app.delete("/api/todo/:uid", async (c) => {
  const uid = c.req.param("uid");
  const result = await todoController.delete({ uid });
  if (result.status === "ok") {
    return c.json(result.data);
  } else {
    c.status(500);
    return c.json(result.error);
  }
});

serve(app, (info) => {
  console.log(`Api server is running on ${info.port}`);
});
