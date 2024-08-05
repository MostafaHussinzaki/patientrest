import { db } from "@/db";

export const revalidate = 10;

export async function getCount() {
	try {
		const scheduledAppointments = await db.appointment.findMany({
			where: {
				status: "SCHEDULED",
			},
		});
		const pendingAppointments = await db.appointment.findMany({
			where: {
				status: "PENDING",
			},
		});
		const cancelledAppointments = await db.appointment.findMany({
			where: {
				status: "CANCELED",
			},
		});

		const counts = {
			scheduled: scheduledAppointments.length,
			pending: pendingAppointments.length,
			cancelled: cancelledAppointments.length,
		};

		return { appointmentsCount: counts };
	} catch (err: any) {
		throw new Error(err.message);
	}
}
