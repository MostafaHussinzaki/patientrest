"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { X } from "lucide-react";

import React, { useState } from "react";
import { buttonVariants } from "../ui/button";

import { useRouter } from "next/navigation";

const AdminPassKey = ({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) => {
	const router = useRouter();
	const [passkey, setPasskey] = useState<string | undefined>("");
	const [error, setError] = useState<string | undefined>("");

	const closeModal = () => {
		setOpen(false);
	};

	const submitAdmin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		// Need to fix admin login logic
		if (passkey === "150119") {
			closeModal();
			sessionStorage.setItem("admin", "AUTHROIZED");
			router.push("/admin");
		} else {
			setError("Invalid passkey. Please try again.");
		}
	};

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogContent className="bg-background flex flex-col gap-6 p-8">
				<AlertDialogHeader className="bg-background">
					<AlertDialogTitle className="flex justify-between items-center w-full text-2xl">
						Access Verification
						<X
							className="w-6 h-6 hover:text-destructive hover:rotate-90 transition-all duration-200 cursor-pointer"
							onClick={closeModal}
						/>
					</AlertDialogTitle>
					<AlertDialogDescription>
						To access the admin page, please enter the passkey...
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div className="bg-background w-ful">
					<InputOTP
						maxLength={6}
						// @ts-ignore
						value={passkey}
						onChange={(value) => setPasskey(value)}
					>
						<InputOTPGroup className="shad-otp">
							<InputOTPSlot index={0} className="shad-otp-slot" />
							<InputOTPSlot index={1} className="shad-otp-slot" />
							<InputOTPSlot index={2} className="shad-otp-slot" />
							<InputOTPSlot index={3} className="shad-otp-slot" />
							<InputOTPSlot index={4} className="shad-otp-slot" />
							<InputOTPSlot index={5} className="shad-otp-slot" />
						</InputOTPGroup>
					</InputOTP>
					{error && <p className="text-[12px] text-red-400 mt-2">{error}</p>}
				</div>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={(e) => submitAdmin(e)}
						className={buttonVariants({ className: "w-full" })}
					>
						Enter Admin Passkey
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AdminPassKey;
