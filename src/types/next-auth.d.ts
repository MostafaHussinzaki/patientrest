import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the default session and token interfaces
declare module "next-auth" {
	interface User {
		id: string;
	}
	interface Session {
		user: User & {
			id: string;
		};
		token: {
			id: string;
		};
	}
}
