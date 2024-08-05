import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ReactNode } from "react";

import React from "react";

export const dynamic = "force-dynamic";

export default function Layout({
	statCards,
	table,
	children,
}: {
	statCards: ReactNode;
	table: ReactNode;
	children: ReactNode;
}) {
	return (
		<main className="flex flex-col mb-6 ">
			<MaxWidthWrapper className="flex-1 h-full flex flex-col gap-10">
				{children}
				<div className="flex flex-col md:flex-row justify-center gap-6 w-full">
					{statCards}
				</div>
				<div>{table}</div>
			</MaxWidthWrapper>
		</main>
	);
}
