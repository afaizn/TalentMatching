import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
	createCompanyValidation,
	updateCompanyValidation,
} from "../modules/companies/schema.js";
import { prisma } from "../utils/prisma.js";

export const companiesRoute = new Hono()
	.get("/", async (c) => {
		const companies = await prisma.company.findMany();

		return c.json({ companies });
	})

	.get("/:id", async (c) => {
		const id = c.req.param("id");

		const company = await prisma.company.findUnique({
			where: { id },
		});

		if (!company) return c.json({ error: "Company not found" }, 404);

		return c.json({ data: company });
	})

	.post("/", zValidator("json", createCompanyValidation), async (c) => {
		const body = c.req.valid("json");

		const newCompany = await prisma.company.create({
			data: {
				name: body.name,
				email: body.email,
				phone: body.phone,
			},
		});

		return c.json({ data: newCompany });
	})

	.patch("/:id", zValidator("json", updateCompanyValidation), async (c) => {
		const id = c.req.param("id");
		const body = c.req.valid("json");

		const updatedCompany = await prisma.company.update({
			where: { id },
			data: {
				...(body.name && { name: body.name }),
				...(body.email && { email: body.email }),
				...(body.phone && { phone: body.phone }),
			},
		});

		return c.json({ data: updatedCompany });
	})

	.delete("/:id", async (c) => {
		const id = c.req.param("id");

		if (!id) return c.json({ error: "Company not found" }, 400);

		await prisma.company.delete({
			where: { id },
		});

		return c.json({ message: "Company deleted" });
	});
