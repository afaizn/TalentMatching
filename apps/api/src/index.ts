import { serve } from "@hono/node-server";
import "dotenv/config";
import { Hono } from "hono";
import { authRouter } from "./modules/auth/route";

const app = new Hono();

app.route("/auth", authRouter);
serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
