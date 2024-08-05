import { db } from "@/db";
import { dateFormatter } from "@/lib/utils";
import { client } from "@/twilio/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const dbAppointment = await db.appointment.update({
			where: {
				appointmentId: body.appointmentId,
			},
			data: {
				status: "CANCELED",
			},
			include: {
				patient: true,
			},
		});

		const smsMessage = `We regret to inform that your appointment for ${dateFormatter(
			dbAppointment.Date
		)} is cancelled. Reason:  ${body.cancelReason}.`;

		await client.messages.create({
			from: "+12243158501",
			to: dbAppointment.patient.phone,
			body: smsMessage,
		});

		revalidatePath("/admin", "layout");
		return NextResponse.json(
			{
				appointment: {
					id: dbAppointment.appointmentId,
					schadule: dbAppointment.Date,
					patientId: dbAppointment.patientId,
					cancelReason: body.cancelReason,
				},
			},
			{ status: 201 }
		);
	} catch (err: any) {
		return NextResponse.json(
			{ message: "Something went wrong, try again later" },
			{ status: 500 }
		);
	}
}
