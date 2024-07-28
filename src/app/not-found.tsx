import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
	// style it later
	return (
		<div className="flex flex-col gap-6 justify-center items-center h-screen">
			<h2>
				<span className="font-bold text-3xl mr-6">404</span>
				<span className="font-medium text-lg text-zinc-400">(Not Found)</span>
			</h2>
			<p className="text-zinc-400">Could not find requested resource</p>
			<Link
				href="/"
				className={buttonVariants({
					size: "sm",
					className: "flex gap-2 text-[0.775rem] md:text-sm",
				})}
			>
				Return Home
			</Link>
		</div>
	);
}
