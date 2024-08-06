"use client";

import { useSearchParams } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/lib/validation";

import InputField from "../InputField";

import { Input } from "../ui/input";
import { DatePicker } from "../DatePicker";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField } from "@/components/ui/form";

import { signIn } from "next-auth/react";

import { useMutation } from "react-query";

type FormField = z.infer<typeof registerSchema>;

const RegisterForm = () => {
	const searchParams = useSearchParams();

	const user = {
		name: searchParams.get("name"),
		email: searchParams.get("email"),
		phone: searchParams.get("phone")?.substring(2),
	};

	const form = useForm<FormField>({
		defaultValues: {
			name: user.name || "",
			email: user.email || "",
			phone: user.phone || "",
			address: "",
			occupation: "",
			emergencyContactName: "",
			emergencyContactNumber: "",
			insuranceProvider: "",
			insurancePolicyNumber: "",
			allergies: "",
			currentMedication: "",
			familyMedicalHistory: "",
			pastMedicalHistory: "",
		},
		resolver: zodResolver(registerSchema),
	});

	const { mutate: createUser, isLoading } = useMutation({
		mutationFn: async (data: FormField) => {
			const res = await fetch("/api/newUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data }),
			});

			const resData = await res.json();

			if (res.status === 409 || res.status === 500) {
				form.setError("root", {
					type: "manual",
					message: resData.message,
				});
			}

			if (!res.ok && res.status !== 409 && res.status !== 500) {
				throw new Error("Error occured: try again later");
			}

			return resData;
		},
		onSuccess: async (data) => {
			const formatDataUser = {
				...data.user,
				name: data.user.name.toLowerCase(),
			};
			await signIn("credentials", {
				...formatDataUser,
				// change when deployment
				callbackUrl: `https://patientrest.vercel.app/${data.user.id}/set-appointment`,
			});
		},
	});

	const onSubmit: SubmitHandler<FormField> = async (data) => {
		createUser(data);
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-14"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-6">
					<h2 className="text-2xl text-white font-bold">
						Personal Information
					</h2>
					<FormField
						control={form.control}
						name="name"
						render={({ field, fieldState }) => (
							<InputField
								label="Full Name"
								htmlFor="name"
								errors={fieldState.error}
							>
								<FormControl>
									<Input
										{...field}
										name="name"
										autoComplete="name"
										type="text"
										id="name"
										placeholder="ex. Mohamed"
									/>
								</FormControl>
							</InputField>
						)}
					/>

					<div className="flex flex-col sm:flex-row gap-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field, fieldState }) => (
								<InputField
									label="Email address"
									htmlFor="email"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Input
											{...field}
											autoComplete="email"
											type="text"
											id="email"
											placeholder="ex. mohamed@gmail.com"
										/>
									</FormControl>
								</InputField>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field, fieldState }) => {
								return (
									<InputField
										label="Phone Number"
										htmlFor="phone"
										errors={fieldState.error}
										className="flex-1"
									>
										<FormControl>
											<Input
												{...field}
												name="phone"
												autoComplete="tel"
												type="text"
												id="phone"
												placeholder="ex. 0123456789"
											/>
										</FormControl>
									</InputField>
								);
							}}
						/>
					</div>
					<div className="flex flex-col sm:flex-row gap-6">
						<FormField
							control={form.control}
							name="birthDate"
							render={({ field, fieldState }) => {
								return (
									<InputField
										label="Birth Date"
										htmlFor="date"
										errors={fieldState.error}
										className="flex flex-col flex-1"
									>
										<DatePicker
											className="flex-1"
											id="date"
											field={field}
											fromDate={new Date(1960, 0)}
											toDate={new Date()}
										/>
									</InputField>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="gender"
							render={({ field, fieldState }) => {
								return (
									<InputField
										label="Gender"
										htmlFor="gender"
										errors={fieldState.error}
										className="flex flex-col flex-1"
									>
										<RadioGroup
											className="flex"
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<div className=" flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-[#363A3D] bg-transparent p-3">
												<RadioGroupItem value="Male" id="male" />
												<Label htmlFor="male" className="cursor-pointer">
													Male
												</Label>
											</div>
											<div className=" flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-[#363A3D] bg-transparent p-3 cursor-pointer">
												<RadioGroupItem value="Female" id="Female" />
												<Label htmlFor="Female" className="cursor-pointer">
													Female
												</Label>
											</div>
										</RadioGroup>
									</InputField>
								);
							}}
						/>
					</div>
					<div className="flex flex-col sm:flex-row gap-6">
						<FormField
							control={form.control}
							name="address"
							render={({ field, fieldState }) => (
								<InputField
									label="Address"
									htmlFor="address"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Input
											{...field}
											autoComplete="address-level1"
											type="text"
											id="address"
											placeholder="ex: 14 street, New York, NY - 5101"
										/>
									</FormControl>
								</InputField>
							)}
						/>
						<FormField
							control={form.control}
							name="occupation"
							render={({ fieldState, field }) => (
								<InputField
									label="Occupation"
									htmlFor="occupation"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Input
											{...field}
											type="text"
											id="occupation"
											placeholder="ex. Software Engineer"
										/>
									</FormControl>
								</InputField>
							)}
						/>
					</div>
					<div className="flex flex-col sm:flex-row gap-6">
						<FormField
							control={form.control}
							name="emergencyContactName"
							render={({ field, fieldState }) => (
								<InputField
									label="Emergency contact name"
									htmlFor="emergName"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Input
											{...field}
											type="text"
											id="emergName"
											placeholder="ex: Guardian's name"
										/>
									</FormControl>
								</InputField>
							)}
						/>
						<FormField
							control={form.control}
							name="emergencyContactNumber"
							render={({ field, fieldState }) => (
								<InputField
									label="Phone number"
									htmlFor="emergPhone"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Input
											{...field}
											type="text"
											id="emergPhone"
											placeholder="ex. 0123456789"
										/>
									</FormControl>
								</InputField>
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<h2 className="text-2xl text-white font-bold">Medical Information</h2>
					<div className="flex flex-col sm:flex-row gap-6">
						<FormField
							control={form.control}
							name="insuranceProvider"
							render={({ field, fieldState }) => (
								<InputField
									label="Insurance provider"
									htmlFor="provider"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Input
											{...field}
											type="text"
											id="provider"
											placeholder="ex. BlueCross"
										/>
									</FormControl>
								</InputField>
							)}
						/>
						<FormField
							control={form.control}
							name="insurancePolicyNumber"
							render={({ field, fieldState }) => (
								<InputField
									label="Insurance policy number"
									htmlFor="providerNum"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Input
											{...field}
											type="text"
											id="providerNum"
											placeholder="ex. 0123456789"
										/>
									</FormControl>
								</InputField>
							)}
						/>
					</div>
					<div className="flex flex-col sm:flex-row gap-6">
						<FormField
							control={form.control}
							name="allergies"
							render={({ field, fieldState }) => (
								<InputField
									label="Allergies (if any)"
									htmlFor="all"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Textarea
											{...field}
											id="all"
											placeholder="ex: Peanuts, Penicillin, Pollen"
										/>
									</FormControl>
								</InputField>
							)}
						/>
						<FormField
							control={form.control}
							name="currentMedication"
							render={({ field, fieldState }) => (
								<InputField
									label="Current medications"
									htmlFor="medi"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Textarea
											{...field}
											id="medi"
											placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
										/>
									</FormControl>
								</InputField>
							)}
						/>
					</div>
					<div className="flex flex-col sm:flex-row gap-6">
						<FormField
							control={form.control}
							name="familyMedicalHistory"
							render={({ field, fieldState }) => (
								<InputField
									label="Family medical history(if relevant)"
									htmlFor="fam"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Textarea
											{...field}
											id="fam"
											placeholder="ex: Brother had cough"
										/>
									</FormControl>
								</InputField>
							)}
						/>
						<FormField
							control={form.control}
							name="pastMedicalHistory"
							render={({ field, fieldState }) => (
								<InputField
									label="Past medical history"
									htmlFor="past"
									errors={fieldState.error}
									className="flex-1"
								>
									<FormControl>
										<Textarea
											{...field}
											id="past"
											placeholder="ex: Asthma diagnosis in childhood"
										/>
									</FormControl>
								</InputField>
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-6">
					<h2 className="text-2xl text-white font-bold">Medical Information</h2>
					<div className="items-top flex space-x-2">
						<FormField
							control={form.control}
							name="treatmentConsent"
							render={({ field, fieldState }) => (
								<>
									<FormControl>
										<Checkbox
											id="terms1"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="flex flex-col gap-1.5 leading-none">
										<label
											htmlFor="terms1"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											I consent to receive treatment for my health condition.
										</label>
										{fieldState.error && (
											<p className="text-[12px] text-red-400 mt-2">
												{fieldState.error.message}
											</p>
										)}
									</div>
								</>
							)}
						/>
					</div>
					<div className="items-top flex space-x-2">
						<FormField
							control={form.control}
							name="disclosureConsent"
							render={({ field, fieldState }) => (
								<>
									<FormControl>
										<Checkbox
											id="terms2"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="flex flex-col gap-1.5 leading-none">
										<label
											htmlFor="terms2"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											I consent to the use and disclosure of my health
											information for treatment purposes.
										</label>
										{fieldState.error && (
											<p className="text-[12px] text-red-400 mt-2">
												{fieldState.error.message}
											</p>
										)}
									</div>
								</>
							)}
						/>
					</div>
					<div className="items-top flex space-x-2">
						<FormField
							control={form.control}
							name="privacyConsent"
							render={({ field, fieldState }) => (
								<>
									<FormControl>
										<Checkbox
											id="terms3"
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="flex flex-col gap-1.5 leading-none">
										<label
											htmlFor="terms3"
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											I acknowledge that I have reviewed and agree to the
											privacy policy
										</label>
										{fieldState.error && (
											<p className="text-[12px] text-red-400 mt-2">
												{fieldState.error.message}
											</p>
										)}
									</div>
								</>
							)}
						/>
					</div>
				</div>
				{form.formState.errors.root && (
					<p className="text-[12px] text-red-400 mt-2">
						{form.formState.errors.root.message}
					</p>
				)}
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Submitting..." : "Submit and Continue"}
				</Button>
			</form>
		</Form>
	);
};

export default RegisterForm;
