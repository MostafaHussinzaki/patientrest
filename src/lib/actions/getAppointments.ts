import { db } from "@/db";

export async function getAppointments({
	userId,
}: {
	userId: number | undefined;
}) {
	try {
		let appointments;
		if (userId) {
			appointments = await db.appointment.findMany({
				where: {
					patientId: userId,
				},
			});
		}
		appointments = await db.appointment.findMany({
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
