import { serve } from '@hono/node-server'
import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server"; // Deno 'npm:@hono/trpc-server'
import { appRouter } from "../route/router";
import { cors } from 'hono/cors';
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

app.use("*", cors());
app.use("*", logger());
app.use("*", prettyJSON());

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  })
);

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
