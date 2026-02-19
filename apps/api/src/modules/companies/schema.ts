import z from "zod";

export const createCompanyValidation = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.email("Invalid email"),
	phone: z.string().min(1, "Phone is required"),
});

export const updateCompanyValidation = createCompanyValidation.partial();
