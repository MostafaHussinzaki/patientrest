import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";

import { Calendar } from "lucide-react";

import { dateFormatter } from "@/lib/utils";

import { db } from "@/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import successGif from "@/assets/gifs/success.gif";

const page = async ({ params }: { params: { appointmentId: string } }) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/auth/sign-in");
	}

	const appointmentData = await db.appointment.findUnique({
		where: {
			appointmentId: +params.appointmentId,
			patientId: +session?.user.id,
		},
	});

	// @ts-ignore
	const formattedDate = dateFormatter(appointmentData?.Date);

	if (!appointmentData) {
		notFound();
	}

	return (
		<main className="flex flex-col mb-10 mt-20">
			<MaxWidthWrapper className="flex-1 h-full flex flex-col gap-10 w-full justify-center items-center">
				<Image src={successGif} height={300} width={280} alt="success" />
				<h2 className="font-bold text-2xl sm:text-4xl text-center max-w-[25ch]">
					Your <span className="text-primary">appointment request</span> has
					been successfully submitted!
				</h2>
				<p className="text-zinc-400 pb-10 border-b border-b-zinc-700 w-full text-center">
					We&apos;ll be in touch shortly to confirm.
				</p>
				<div className="flex flex-col sm:flex-row gap-3 items-center pb-10 border-b border-b-zinc-700 w-full justify-center">
					<h3>Requested appointment details: </h3>
					<span className="bg-gradiantt border border-zinc-700 text-sm px-2 py-1 rounded-md">
						{appointmentData?.doctor}
					</span>
					<span className="flex items-center">
						<Calendar className="text-zinc-400 h-4 w-4 mr-2" />
						<p className="text-zinc-400 text-sm">{formattedDate}</p>{" "}
					</span>
				</div>
				<Link
					href={`/${session.user.id}/set-appointment`}
					className={buttonVariants({ size: "sm" })}
				>
					New Appointment
				</Link>
				<span className="text-zinc-400 text-sm">&#169;2024 patientrest</span>
			</MaxWidthWrapper>
		</main>
	);
};

export default page;
