import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
	createCompanyValidation,
	updateCompanyValidation,
} from "../modules/companies/schema.js";
import { prisma } from "../utils/prisma.js";

export const companiesRoute = new Hono()
	.get("/", async (c) => {
		try {
			const companies = await prisma.company.findMany();

			return c.json(
				{
					message: "Companies retrieved",
					data: companies,
				},
				200,
			);
		} catch (error) {
			console.error("Error fetching companies:", error);
			return c.json({ error: "Failed to fetch companies" }, 500);
		}
	})

	.get("/:id", async (c) => {
		try {
			const id = c.req.param("id");

			const company = await prisma.company.findUnique({
				where: { id },
			});

			if (!company) return c.json({ error: "Company not found" }, 404);

			return c.json(
				{ message: `Company ${company.name} retrieved`, data: company },
				200,
			);
		} catch (error) {
			console.error("Error fetching company:", error);
			return c.json({ error: "Failed to fetch company" }, 500);
		}
	})

	.post("/", zValidator("json", createCompanyValidation), async (c) => {
		try {
			const body = c.req.valid("json");

			const newCompany = await prisma.company.create({
				data: {
					name: body.name,
					email: body.email,
					phone: body.phone,
				},
			});

			return c.json({ message: "Company created", data: newCompany }, 201);
		} catch (error) {
			console.error("Error creating company:", error);
			return c.json({ error: "Failed to create company" }, 500);
		}
	})

	.patch("/:id", zValidator("json", updateCompanyValidation), async (c) => {
		try {
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

			return c.json({ message: "Company updated", data: updatedCompany }, 200);
		} catch (error) {
			console.error("Error updating company:", error);
			return c.json({ error: "Failed to update company" }, 500);
		}
	})

	.delete("/:id", async (c) => {
		try {
			const id = c.req.param("id");

			if (!id) return c.json({ error: "Company not found" }, 400);

			await prisma.company.delete({
				where: { id },
			});

			return c.json({ message: "Company deleted" }, 200);
		} catch (error) {
			console.error("Error deleting company:", error);
			return c.json({ error: "Failed to delete company" }, 500);
		}
	});
