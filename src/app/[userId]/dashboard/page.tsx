import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import { DataTable } from "@/components/table/DataTable";
import { userColumns } from "@/components/table/Columns";
import { getAppointments } from "@/lib/actions/getAppointments";

const page = async ({ params }: { params: { userId: string } }) => {
	// Fetch the session for the incoming request
	const session = await getServerSession(authOptions);

	// If no session exists, redirect to the sign-in page
	if (!session) {
		redirect("/auth/sign-in");
	}
	if (params.userId !== session.user.id) {
		notFound();
	}

	const userAppointments = await getAppointments({
		userId: +session.user.id,
	});

	return (
		<main className="h-full">
			<MaxWidthWrapper className="w-full flex flex-col gap-10">
				<div className="flex flex-col gap-8">
					<div className="mt-24 ">
						<h1 className="text-4xl text-white font-bold mb-2">
							Hey,{session?.user.name} 👋.
						</h1>
						<p className="text-lg text-zinc-400">
							This is all your appointments.
						</p>
					</div>
				</div>
				<div>
					<DataTable data={userAppointments} columns={userColumns} />
				</div>
			</MaxWidthWrapper>
		</main>
	);
};

export default page;
