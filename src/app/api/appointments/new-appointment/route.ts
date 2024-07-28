import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const dbAppointment = await db.appointment.create({
			data: {
				doctor: body.primaryPhysician,
				Date: body.schedule,
				reason: body.reason,
				note: body.note,
				patientId: +body.userId,
				status: "PENDING",
			},
		});
		return NextResponse.json(
			{ appointment: { id: dbAppointment.appointmentId } },
			{ status: 201 }
		);
	} catch (err: any) {
		return NextResponse.json(
			{ message: "Something went wrong, try again later" },
			{ status: 500 }
		);
	}
}
