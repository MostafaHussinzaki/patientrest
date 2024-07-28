import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const dateFormatter = (date) =>
	new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(date);
