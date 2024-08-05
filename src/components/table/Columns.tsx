"use client";

import { Appointment, Patient } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { dateFormatter } from "@/lib/utils";
import BadgeStatus from "../BadgeStatus";
import { DOCTORS } from "@/lib/constant";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AppointmentAction from "../model/AppointmentAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Appointments = {
	patient: Patient;
} & Appointment;
export const columns: ColumnDef<Appointments>[] = [
	{
		header: "#",
		cell: ({ row }) => {
			return <p className="text-14-medium ">{row.index + 1}</p>;
		},
	},
	{
		accessorKey: "patient",
		header: "Patient",
		cell: ({ row }) => {
			return <p className="text-14-medium ">{row.original.patient.name}</p>;
		},
	},
	{
		accessorKey: "Date",
		header: "Date",
		cell: ({ row }) => {
			return (
				<p className="text-14-medium ">{dateFormatter(row.original.Date)}</p>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const data = row.original;

			return <BadgeStatus status={data.status} />;
		},
	},
	{
		accessorKey: "doctor",
		header: "Doctor",
		cell: ({ row }) => {
			const data = row.original;
			const doctor = DOCTORS.find((doctor) => doctor.name === data.doctor);
			const names = doctor?.name.split(" ");
			//@ts-ignore
			const fallback = `${names[0][0]} ${names[1][0]}`;

			return (
				<div className="w-full flex items-center justify-start gap-2">
					<Avatar>
						<AvatarImage src={doctor?.img} />
						<AvatarFallback>{fallback.toUpperCase()}</AvatarFallback>
					</Avatar>
					<h3 className="text-white font-medium">Dr. {doctor?.name}</h3>
				</div>
			);
		},
	},
	{
		accessorKey: "action",
		header: () => <div className="pl-4">Actions</div>,
		cell: ({ row }) => {
			const appointment = row.original;

			return (
				<div className="flex gap-2">
					{appointment.status === "SCHEDULED" ||
					appointment.status === "CANCELED" ? (
						<span>No action</span>
					) : (
						<>
							<AppointmentAction
								type="schedule"
								label="Schadule"
								title="Schedule Appointment"
								description="Please fill in the following details to schedule"
								appointment={appointment}
							/>
							<AppointmentAction
								type="cancel"
								label="Cancel"
								title="Cancel Appointment"
								description="Are you sure you want to cancel your appointment"
								appointment={appointment}
							/>
						</>
					)}
				</div>
			);
		},
	},
];
