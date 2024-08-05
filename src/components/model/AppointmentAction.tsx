import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Appointment } from "@prisma/client";
import { X } from "lucide-react";
import { useState } from "react";
import { AppointmentSchaduleForm } from "../form/AppointmentSchaduleForm";
import { AppointmentCancelForm } from "../form/AppointmentCancelForm";

const AppointmentAction = ({
	type,
	label,
	title,
	description,
	appointment,
}: {
	type: "schedule" | "cancel";
	label: string;
	title: string;
	description: string;
	appointment: Appointment;
}) => {
	const [open, setOpen] = useState(false);

	const closeModal = () => {
		setOpen(false);
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger>
				<span
					className={
						type === "schedule" ? "text-primary" : "text-primary-foreground"
					}
				>
					{label}
				</span>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader className="bg-background">
					<AlertDialogTitle className="flex justify-between items-center w-full text-2xl">
						{title}
						<X
							className="w-6 h-6 hover:text-destructive hover:rotate-90 transition-all duration-200 cursor-pointer"
							onClick={closeModal}
						/>
					</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				{type === "schedule" && (
					<AppointmentSchaduleForm appointment={appointment} open={setOpen} />
				)}
				{type === "cancel" && (
					<AppointmentCancelForm appointment={appointment} open={setOpen} />
				)}
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AppointmentAction;
