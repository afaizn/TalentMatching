import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { candidatesRoute } from "./routes/candidates.js";
import { Prisma } from "./utils/prisma.js";

const app = new Hono();

console.log("ENV", process.env.TEST);

app.route("candidates", candidatesRoute);

serve(
	{
		fetch: app.fetch,
		port: 8000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
