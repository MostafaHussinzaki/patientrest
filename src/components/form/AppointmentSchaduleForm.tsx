import { useForm, SubmitHandler } from "react-hook-form";
import { appointmentSchaduleSchema } from "@/lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "../ui/textarea";
import InputField from "../InputField";
import SelectDoctor from "../SelectDoctor";
import { Form, FormControl, FormField } from "../ui/form";
import { Calendar, Router } from "lucide-react";
import DatePicker from "react-datepicker";
import { Button } from "../ui/button";

import { Appointment } from "@prisma/client";

import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

import "react-datepicker/dist/react-datepicker.css";

type appointmentSchaduleFormField = z.infer<typeof appointmentSchaduleSchema>;

export const AppointmentSchaduleForm = ({
	appointment,
	open,
}: {
	appointment: Appointment;
	open: any;
}) => {
	const router = useRouter();
	const form = useForm<appointmentSchaduleFormField>({
		defaultValues: {
			doctor: appointment.doctor,
			reason: appointment.reason,
			schedule: appointment.Date,
		},
		resolver: zodResolver(appointmentSchaduleSchema),
	});

	const { mutate: schaduleAppointment, isLoading } = useMutation({
		mutationFn: async (data: appointmentSchaduleFormField) => {
			const res = await fetch("/api/appointments/schadule-appointment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					appointmentId: appointment.appointmentId,
					patientId: appointment.patientId,
				}),
				cache: "no-cache",
			});

			if (!res.ok) {
				form.setError("root", {
					type: "manual",
					message: "Something went wrong, try again later",
				});
				throw new Error("Something went wrong, try again later");
			}

			const resData = await res.json();

			return resData;
		},
		onSuccess: (data) => {
			router.refresh();
			open(false);
		},
	});

	const onSubmit: SubmitHandler<appointmentSchaduleFormField> = async (
		data
	) => {
		schaduleAppointment(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-8"
			>
				<FormField
					control={form.control}
					name="doctor"
					render={({ field, fieldState }) => (
						<InputField
							label="Doctor"
							htmlFor="doctor"
							errors={fieldState.error}
						>
							<SelectDoctor field={field} disabled />
						</InputField>
					)}
				/>
				<FormField
					control={form.control}
					name="reason"
					render={({ field, fieldState }) => (
						<InputField
							label="Reason fro appointment "
							htmlFor="reason"
							errors={fieldState.error}
							className="flex-1"
						>
							<FormControl>
								<Textarea
									{...field}
									id="reason"
									placeholder="ex: Annual montly check-up"
									disabled
								/>
							</FormControl>
						</InputField>
					)}
				/>
				<FormField
					control={form.control}
					name="schedule"
					render={({ field, fieldState }) => {
						return (
							<InputField
								label="Expected appointment date"
								htmlFor="schedule"
								errors={fieldState.error}
								className="flex flex-col flex-1"
							>
								<div className="flex items-center px-4 rounded-md border border-zinc-500 bg-muted">
									<Calendar className="h-5 w-5 text-400" />
									<FormControl>
										<DatePicker
											showTimeSelect
											selected={field.value}
											onChange={field.onChange}
											timeInputLabel="Time:"
											dateFormat={"MM/dd/yyyy  -  h:mm aa"}
											startDate={new Date()}
											excludeDateIntervals={[
												{ start: new Date(1406567149), end: new Date() },
											]}
											showDisabledMonthNavigation
											placeholderText="Click to select a date"
											wrapperClassName="date-picker"
										/>
									</FormControl>
								</div>
							</InputField>
						);
					}}
				/>
				{form.formState.errors.root && (
					<p className="text-[12px] text-red-400 mt-2">
						{form.formState.errors.root.message}
					</p>
				)}
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
};

// export const AppointmentCancelForm = () => {
// 	const form = useForm({});

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={}>
// 				<FormField
// 					control={form.control}
// 					name="primaryPhysician"
// 					render={({ field, fieldState }) => (
// 						<InputField
// 							label="Doctor"
// 							htmlFor="primaryDoctor"
// 							errors={fieldState.error}
// 						>
// 							<SelectDoctor field={field} />
// 						</InputField>
// 					)}
// 				/>
// 			</form>
// 		</Form>
// 	);
// };
