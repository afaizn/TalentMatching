import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { parse } from "csv-parse/sync";
import { PrismaClient } from "../src/generated/prisma/client.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const adapter = new PrismaBetterSqlite3({
	url: "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
	const csvFile = readFileSync(join(__dirname, "data.csv"), "utf-8");

	const records = parse(csvFile, {
		columns: true,
		skip_empty_lines: true,
	}) as Record<string, string>[];

	for (const record of records) {
		await prisma.candidate.create({
			data: {
				name: record.Name,
				email: record.Email,
				phone: record.Phone,
				address: record.Address,
				profile_summmary: record["Profile Summary (LinkedIn Style)"],
				last_education: record["Last Education"],
				last_role: record["Last Role"],
				last_salary: Number(record["Last Salary"].replace(/,/g, "")),
				salary_expectation: Number(record.Expectation.replace(/,/g, "")),
				CompanyId: record["Company id"] ? Number(record["Company id"]) : null,
			},
		});
	}

	console.log(`Seeding done! ${records.length} candidates inserted.`);
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
