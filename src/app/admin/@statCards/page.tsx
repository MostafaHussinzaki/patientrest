import StatCard from "@/components/StatCard";
import React from "react";

import { getCount } from "@/lib/actions/getCount";


const page = async () => {
	const { appointmentsCount: counts } = await getCount();
	return (
		<>
			<StatCard
				type="appointments"
				label="scheduled"
				count={counts.scheduled}
			/>
			<StatCard type="pending" label="pending" count={counts.pending} />
			<StatCard type="cancelled" label="cancelled" count={counts.cancelled} />
		</>
	);
};

export default page;
