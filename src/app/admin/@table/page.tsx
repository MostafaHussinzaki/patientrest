import { Appointments, adminColumns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import { getAppointments } from "@/lib/actions/getAppointments";

export default async function Page() {
	const data: Appointments[] = await getAppointments({ userId: undefined });

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={adminColumns} data={data} />
		</div>
	);
}
