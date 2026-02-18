import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";

// Prisma client in this workspace's generated types requires an `adapter` or `accelerateUrl`
// option. For local SQLite usage we don't need an external adapter package; cast the
// empty options to `any` so the runtime uses the built-in SQLite engine while keeping
// TypeScript happy.

const adapter = new PrismaBetterSqlite3({
	url: "file:./prisma/dev.db",
});

export const Prisma = new PrismaClient({
	adapter,
});
