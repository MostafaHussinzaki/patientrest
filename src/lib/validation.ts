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

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(2, "Name must be at least 2 characters")
			.max(50, "Name must be at most 50 characters"),
		email: z.string().email("Invalid email address"),
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
		birthDate: z.coerce.date({ message: "Invalid Date" }),
		gender: z.enum(["Male", "Female"], {
			message: "Expected value Male or Female",
		}),
		address: z
			.string()
			.min(5, "Address must be at least 5 characters")
			.max(500, "Address must be at most 500 characters"),
		occupation: z
			.string()
			.min(2, "Occupation must be at least 2 characters")
			.max(500, "Occupation must be at most 500 characters"),
		emergencyContactName: z
			.string()
			.min(2, "Contact name must be at least 2 characters")
			.max(50, "Contact name must be at most 50 characters"),
		emergencyContactNumber: z.string().transform((arg, ctx) => {
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
		insuranceProvider: z
			.string()
			.min(2, "Insurance name must be at least 2 characters")
			.max(50, "Insurance name must be at most 50 characters"),
		insurancePolicyNumber: z
			.string()
			.min(2, "Policy number must be at least 2 characters")
			.max(50, "Policy number must be at most 50 characters"),
		allergies: z.string().optional(),
		currentMedication: z.string().optional(),
		familyMedicalHistory: z.string().optional(),
		pastMedicalHistory: z.string().optional(),
		treatmentConsent: z
			.boolean()
			.default(false)
			.refine((value) => value === true, {
				message: "You must consent to treatment in order to proceed",
			}),
		disclosureConsent: z
			.boolean()
			.default(false)
			.refine((value) => value === true, {
				message: "You must consent to disclosure in order to proceed",
			}),
		privacyConsent: z
			.boolean()
			.default(false)
			.refine((value) => value === true, {
				message: "You must consent to privacy in order to proceed",
			}),
	})
	.refine((data) => data.emergencyContactNumber !== data.phone, {
		path: ["emergencyContactNumber"],
		message: "This Emergency number shouldn't be equal your Personal number",
	});

export const createAppointmentSchema = z.object({
	primaryPhysician: z.string(),
	schedule: z.coerce.date(),
	reason: z
		.string()
		.min(2, "Reason must be at least 2 characters")
		.max(500, "Reason must be at most 500 characters"),
	note: z.string().optional(),
});

export const appointmentSchaduleSchema = z.object({
	doctor: z.string(),
	reason: z
		.string()
		.min(2, "Reason must be at least 2 characters")
		.max(500, "Reason must be at most 500 characters"),
	schedule: z.coerce.date(),
});

export const appointmentCancelSchema = z.object({
	cancelReason: z
		.string()
		.min(2, { message: "Must give and reasonable reason" })
		.max(500, { message: "Must not exceed 500 character" }),
});
