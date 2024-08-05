import { CalendarCheck2, Hourglass, TriangleAlert } from "lucide-react";
import React from "react";
import clsx from "clsx";

const BadgeStatus = ({ status }: { status: string }) => {
	return (
		<div
			className={clsx("flex w-fit items-center gap-2 rounded-full px-2 py-1", {
				"bg-[#0D2A1F]": status === "SCHEDULED",
				"bg-[#152432]": status === "PENDING",
				"bg-[#3E1716]": status === "CANCELED",
			})}
		>
			{status === "SCHEDULED" && (
				<CalendarCheck2 className="text-[#24AE7C] w-3 h-3" />
			)}
			{status === "PENDING" && <Hourglass className="text-[#79B5EC] w-3 h-3" />}
			{status === "CANCELED" && (
				<TriangleAlert className="text-[#F37877] w-3 h-3" />
			)}
			<p
				className={clsx("text-[12px] font-semibold capitalize", {
					"text-[#24AE7C]": status === "SCHEDULED",
					"text-[#79B5EC]": status === "PENDING",
					"text-[#F37877]": status === "CANCELED",
				})}
			>
				{status.toLowerCase()}
			</p>
		</div>
	);
};

export default BadgeStatus;
