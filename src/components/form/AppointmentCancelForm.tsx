import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { appointmentCancelSchema } from "@/lib/validation";
import { z } from "zod";
import { Form, FormControl, FormField } from "../ui/form";
import InputField from "../InputField";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Appointment } from "@prisma/client";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";

type appointmentSchaduleFormField = z.infer<typeof appointmentCancelSchema>;

export const AppointmentCancelForm = ({
	appointment,
	open,
}: {
	appointment: Appointment;
	open: any;
}) => {
	const router = useRouter();

	const form = useForm<appointmentSchaduleFormField>({
		defaultValues: {
			cancelReason: "",
		},
		resolver: zodResolver(appointmentCancelSchema),
	});

	const { mutate: cancelAppointment, isLoading } = useMutation({
		mutationFn: async (data: appointmentSchaduleFormField) => {
			const res = await fetch("/api/appointments/cancel-appointment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					appointmentId: appointment.appointmentId,
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
		cancelAppointment(data);

		// Here the logic run
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-8"
			>
				<FormField
					control={form.control}
					name="cancelReason"
					render={({ field, fieldState }) => (
						<InputField
							label="Reason for cancellation"
							htmlFor="cancel"
							errors={fieldState.error}
						>
							<FormControl>
								<Textarea
									{...field}
									id="cancel"
									placeholder="ex: Urgent meeting came up"
								/>
							</FormControl>
						</InputField>
					)}
				/>

				{form.formState.errors.root && (
					<p className="text-[12px] text-red-400 mt-2">
						{form.formState.errors.root.message}
					</p>
				)}
				<Button type="submit" variant="destructive" disabled={isLoading}>
					{isLoading ? "Submtting..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
};
