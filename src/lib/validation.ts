import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const signInSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phone: z.string().transform((arg, ctx) => {
		const phone = parsePhoneNumberFromString(arg, {
			defaultCountry: "EG",
			extract: false,
		});

		if (phone && phone.isValid()) {
			return phone.number;
		}
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: "Invalid phone number in Egypt",
		});
		return z.NEVER;
	}),
});
