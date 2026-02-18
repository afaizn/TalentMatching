import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function hashPassword(password: string) {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}

export function comparePassword(password: string, hashPassword: string) {
	return bcrypt.compare(password, hashPassword);
}

export function generateAcessToken(userId: number) {
	return jwt.sign({ sub: userId, type: "access" }, process.env.JWT_SECRET!, {
		expiresIn: "5m",
	});
}

export function generateRefreshToken(userId: number) {
	return jwt.sign({ sub: userId, type: "refresh" }, process.env.JWT_SECRET!, {
		expiresIn: "7d",
	});
}

export function verifyRefreshToken(token: string) {
	return jwt.verify(token, process.env.JWT_SECRET!);
}
