import { db } from "@/db";
import { Appointment } from "@prisma/client";

export const revalidate = 10;

export async function getCount() {
	try {
		const appointments = await db.appointment.findMany({});

		let initialCounts = {
			scheduled: 0,
			pending: 0,
			cancelled: 0,
		};
		const counts = (appointments as Appointment[]).reduce(
			(acc, appointment) => {
				switch (appointment.status) {
					case "SCHEDULED":
						acc.scheduled++;
						break;
					case "PENDING":
						acc.pending++;
						break;
					case "CANCELED":
						acc.cancelled++;
						break;
				}
				return acc;
			},
			initialCounts
		);

		return { appointmentsCount: counts };
	} catch (err: any) {
		throw new Error(err.message);
	}
}
