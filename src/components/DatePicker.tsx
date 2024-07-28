"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
	className,
	id,
	field,
	fromDate,
	toDate,
}: {
	className: string;
	id: string;
	field: any;
	fromDate?: Date;
	toDate?: Date;
}) {
	const [date, setDate] = React.useState<Date>();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"justify-start text-left font-normal bg-muted",
						className,
						!field.value && "text-[#ABB8C4]"
					)}
					id={id}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={field.value}
					onSelect={field.onChange}
					initialFocus
					captionLayout="dropdown-buttons"
					fromDate={fromDate}
					toDate={toDate}
				/>
			</PopoverContent>
		</Popover>
	);
}
