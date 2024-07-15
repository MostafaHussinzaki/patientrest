import { db } from "@/db";
import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				name: { label: "name", type: "text", placeholder: "jsmith" },
				email: { label: "email", type: "email", placeholder: "jsmith@email" },
				phone: {
					label: "phone",
					type: "text",
					placeholder: "01001212",
				},
			},
			async authorize(credentials, req) {
				// get the user from database
				const dbUser = await db.patient.findFirst({
					where: {
						email: credentials?.email,
					},
				});
				if (dbUser) {
					// check if the user enter correct data or not
					if (
						dbUser.phone !== credentials?.phone ||
						dbUser.name !== credentials?.name
					) {
						throw new Error("Incorrect data");
					} else {
						const user = {
							id: dbUser.id.toString(),
							name: dbUser.name,
							email: dbUser.email,
						};
						return user;
					}
				} else {
					// create new user in database
					await db.patient.create({
						data: {
							email: credentials?.email,
							name: credentials?.name,
							phone: credentials?.phone,
						},
					});
					return null;
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/sign-in",
	},
};
