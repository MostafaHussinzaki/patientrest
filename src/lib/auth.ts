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
				// TODO: changed when deployed
				if (
					req?.headers?.referer ===
					"https://patientrest.vercel.app/auth/sign-in"
				) {
					// get the user from database
					const dbUser = await db.patient.findUnique({
						where: {
							email: credentials?.email,
						},
					});

					if (!dbUser) return null;

					// check if the user enter correct data or not
					if (dbUser.phone !== credentials?.phone)
						throw new Error("Incorrect Phone number");

					if (dbUser.name !== credentials?.name)
						throw new Error("Incorrect Name");

					const user = {
						id: dbUser.id.toString(),
						name: dbUser.name,
						email: dbUser.email,
					};
					return user;
				} else {
					const user = {
						//@ts-ignore
						id: credentials?.id.toString(),
						name: credentials?.name,
						email: credentials?.email,
					};
					return user;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// Add custom properties to the token
			if (user) {
				return {
					...token,
					id: user.id,
				};
			}
			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id,
				},
			};
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/sign-in",
	},
};
