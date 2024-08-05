import { cn } from "@/lib/utils";
import { CalendarCheck2, Hourglass, TriangleAlert } from "lucide-react";

type StatCardProps = {
	type: "appointments" | "pending" | "cancelled";
	count: number;
	label: string;
};

const StatCard = ({ type, count, label }: StatCardProps) => {
	let icon, bgColor;

	switch (type) {
		case "appointments":
			icon = <CalendarCheck2 className="text-[#FFD147] w-7 h-7" />;
			bgColor = "bgImage-appointments";
			break;
		case "pending":
			icon = <Hourglass className="text-[#79B5EC] w-7 h-7" />;
			bgColor = "bgImage-pending";
			break;
		case "cancelled":
			icon = (
				<TriangleAlert className="text-[#FF4F4E]  w-7 h-7" />
			);
			bgColor = "bgImage-cancelled";
			break;
	}
	return (
		<div className={cn("flex flex-col gap-6 p-6 rounded-xl ", bgColor)}>
			<div className="flex justify-start items-center gap-[14px]">
				{icon}
				<h3 className="text-3xl font-bold">{count}</h3>
			</div>
			<p className="">Total number of {label} appointments</p>
		</div>
	);
};

export default StatCard;
