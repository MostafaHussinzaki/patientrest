import { db } from "@/db";
import { dateFormatter } from "@/lib/utils";
import { client } from "@/twilio/client";
import { truncateSync } from "fs";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const dbAppointment = await db.appointment.update({
			where: {
				appointmentId: body.appointmentId,
			},
			data: {
				status: "SCHEDULED",
				Date: body.schedule,
			},
			include: {
				patient: true,
			},
		});

		const smsMessage = `Greetings from Patientrest. Your appointment is confirmed for ${dateFormatter(
			dbAppointment.Date
		)} with Dr. ${dbAppointment.doctor}.`;

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
