import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { companiesRoute } from "./router/companies";

const app = new Hono();

console.log("ENV", process.env.TEST);

app.route("/companies", companiesRoute);

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
