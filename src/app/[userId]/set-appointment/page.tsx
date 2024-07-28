import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import { notFound, redirect } from "next/navigation";

import React from "react";

import Image from "next/image";
import appointmentImage from "@/assets/appointment-img.png";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import AppointmentForm from "@/components/form/AppointmentForm";

const Page = async ({ params }: { params: { userId: string } }) => {
	// Fetch the session for the incoming request
	const session = await getServerSession(authOptions);

	// If no session exists, redirect to the sign-in page
	if (!session) {
		redirect("/auth/sign-in");
	}

	if(params.userId !== session.user.id) {
		notFound();	
	}
	return (
		<main className="flex flex-col lg:flex-row mb-10">
			<MaxWidthWrapper className="flex-1 h-full flex flex-col gap-10 w-full">
				<div className="flex flex-col gap-8">
					<div className="mt-24 ">
						<h1 className="text-4xl text-white font-bold mb-2">
							Hey, {session?.user.name} 👋.
						</h1>
						<p className="text-lg text-zinc-400">
							Request a new appointment in 10 seconds.
						</p>
					</div>
				</div>

				<AppointmentForm userId={params.userId} />
			</MaxWidthWrapper>
			<div className="flex-[0.5] lg:h-full rounded-sm hidden lg:block">
				<Image
					src={appointmentImage}
					alt="A doctor just standing"
					width={780}
					height={1916}
					quality={75}
					className=" lg:h-full rounded-sm"
					priority
				/>
			</div>
		</main>
	);
};

export default Page;
