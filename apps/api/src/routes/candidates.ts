import { Hono } from "hono";
import { Prisma } from "../utils/prisma";

export const candidatesRoute = new Hono()

	.get("/", async (c) => {
		const candidates = await Prisma.candidate.findMany();
		return c.json(candidates);
	})

	.get("/:id", async (c) => {
		const { id } = c.req.param();
		const candidate = await Prisma.candidate.findUnique({
			where: { id: Number(id) },
			include: {
				company: {
					select: {
						name: true,
					},
				},
			},
		});
		if (!candidate) {
			return c.text("Kandidat tidak ditemukan", 404);
		}
		return c.json(candidate);
	});
