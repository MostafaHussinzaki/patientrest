"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createAppointmentSchema } from "@/lib/validation";

import InputField from "../InputField";
import { DatePicker } from "../DatePicker";
import SelectDoctor from "@/components/SelectDoctor";

import { Form, FormControl, FormField } from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

type appointmentFormField = z.infer<typeof createAppointmentSchema>;

const AppointmentForm = ({ userId }: { userId: string }) => {
	const router = useRouter();
	const form = useForm<appointmentFormField>({
		defaultValues: {
			reason: "",
			note: "",
		},
		resolver: zodResolver(createAppointmentSchema),
	});

	const { mutate: newAppointment, isLoading } = useMutation({
		mutationFn: async (data: appointmentFormField) => {
			const res = await fetch("/api/appointments/new-appointment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...data, userId }),
			});
			if (!res.ok) {
				form.setError("root", {
					type: "manual",
					message: "Something went wrong, try again later",
				});
				throw new Error('Something went wrong, try again later')
			}

			const resData = await res.json();

			return resData;
		},
		onSuccess: (data) => {
			router.push(`/success/${data.appointment.id}`);
		},
	});

	const onSubmit: SubmitHandler<appointmentFormField> = async (data) => {
		newAppointment(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<FormField
					control={form.control}
					name="primaryPhysician"
					render={({ field, fieldState }) => (
						<InputField
							label="Doctor"
							htmlFor="primaryDoctor"
							errors={fieldState.error}
						>
							<SelectDoctor field={field} />
						</InputField>
					)}
				/>
				<div className="flex flex-col sm:flex-row gap-6">
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
									/>
								</FormControl>
							</InputField>
						)}
					/>
					<FormField
						control={form.control}
						name="note"
						render={({ field, fieldState }) => (
							<InputField
								label="Additional comments/notes"
								htmlFor="note"
								errors={fieldState.error}
								className="flex-1"
							>
								<FormControl>
									<Textarea
										{...field}
										id="note"
										placeholder="ex: Prefer afternoon appointments, if possible"
									/>
								</FormControl>
							</InputField>
						)}
					/>
				</div>
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
								<DatePicker
									className="flex-1"
									id="schedule"
									field={field}
									fromDate={new Date()}
								/>
							</InputField>
						);
					}}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Submitting..." : "Submit"}
				</Button>
				{form.formState.errors.root && (
					<p className="text-[12px] text-red-400 mt-2">
						{form.formState.errors.root.message}
					</p>
				)}
			</form>
		</Form>
	);
};

export default AppointmentForm;
