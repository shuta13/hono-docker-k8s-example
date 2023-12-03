"use strict";

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

app.use("/assets/*", serveStatic({ root: "./dist" }));
app.use("/vite.svg", serveStatic({ path: "./dist/vite.svg" }));
app.use("/", serveStatic({ path: "./dist/index.html" }));

serve({ fetch: app.fetch, port: 8080 }, (info) => {
  console.log(`Web server is running on ${info.port}`);
});
