"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { signIn } from "next-auth/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/validation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";

type FormField = z.infer<typeof signInSchema>;

const SignInForm = () => {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormField>({
		resolver: zodResolver(signInSchema),
	});

	const onSubmit: SubmitHandler<FormField> = async (data) => {
		const formatData = {
			name: data.name.toLowerCase(),
			email: data.email,
			phone: data.phone,
		};
		const signInResponse = await signIn("credentials", {
			...formatData,
			redirect: false,
		});
		if (signInResponse?.status === 401) {
			if (signInResponse.error?.startsWith("Incorrect")) {
				setError(`Email is already exist: ${signInResponse.error}`);
			} else {
				router.push(
					`/auth/register?name=${data.name}&email=${data.email}&phone=${data.phone}`
				);
			}
		} else if (signInResponse?.status === 200) {
			router.push(`/auth-callback`);
		} else {
			// TODO: handle this error
			throw new Error("Handled later");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<InputField label="Full Name" htmlFor="name" errors={errors.name}>
				<Input
					{...register("name")}
					type="text"
					name="name"
					id="name"
					placeholder="Mohamed Ahmed"
				/>
			</InputField>

			<InputField label="Email Address" htmlFor="email" errors={errors.email}>
				<Input
					{...register("email")}
					type="email"
					name="email"
					id="email"
					placeholder="mohamed@gmail.com"
				/>
			</InputField>
			<InputField label="Phone Number" htmlFor="phone" errors={errors.phone}>
				<Input
					{...register("phone")}
					type="text"
					name="phone"
					id="phone"
					placeholder="0123456789"
				/>
			</InputField>

			{error && <p className="text-[12px] text-red-400 mt-2">{error}</p>}

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Redirecting..." : "submit"}
			</Button>
		</form>
	);
};

export default SignInForm;
