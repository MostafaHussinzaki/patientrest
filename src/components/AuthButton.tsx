"use client";

import Link from "next/link";

import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

import { useSession } from "next-auth/react";

const AuthButton = () => {
	const { data: session } = useSession();

	return (
		<>
			{session ? (
				""
			) : (
				<Link
					href="/auth/sign-in"
					className={buttonVariants({
						size: "sm",
						className: "flex gap-2 text-[0.775rem] md:text-sm",
					})}
				>
					Get started <ArrowRight className="w-4 h-4" />
				</Link>
			)}
		</>
	);
};

export default AuthButton;
