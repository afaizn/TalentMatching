import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { companiesRoute } from "./router/companies";

const app = new Hono().use(cors()).route("/companies", companiesRoute);

console.log("ENV", process.env.TEST);

export type AppType = typeof app;

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
