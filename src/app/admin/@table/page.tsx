import { Appointments, columns } from "@/components/table/Columns";
import { DataTable } from "@/components/table/DataTable";
import { getAppointments } from "@/lib/actions/getAppointments";

export default async function Page() {
	const data: Appointments[] = await getAppointments();

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
