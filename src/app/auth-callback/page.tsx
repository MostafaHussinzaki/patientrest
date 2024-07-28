import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const page = async () => {
	const session = await getServerSession(authOptions);

	if (session) {
		redirect(`/${session.user.id}/set-appointment`);
	}
	else {
		redirect(`/auth/register`)
	}
};

export default page;
