import { db } from "@/db";

export async function getAppointments() {
	try {
		const appointments = await db.appointment.findMany({
			orderBy: {
				appointmentId: "desc",
			},
			include: { patient: true },
		});

		return appointments;
	} catch (err: any) {
		throw new Error(err.message);
	}
}
