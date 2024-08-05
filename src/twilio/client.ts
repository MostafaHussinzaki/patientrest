import twilio from "twilio";

export const client = twilio(
	process.env.TWILIO_SID,
	process.env.AUTH_TOKEN_TWILIO
);
