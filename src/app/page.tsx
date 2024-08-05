import coverImage from "@/assets/cover.png";
import successImage from "@/assets/success.png";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ImageWrapper from "@/components/ImageWrapper";

import { buttonVariants } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
	return (
		<main className="mb-12">
			<MaxWidthWrapper className="mb-6 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
				<div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-800 bg-backgrounds px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-900 hover:bg-background/50">
					<p className="text-sm font-semibold tracking-wide">
						Patientrest is now public
					</p>
				</div>
				<div className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
					set your <span className="text-primary">appointment</span> with your
					doctor now
				</div>
				<p className=" mt-6 max-w-prose text-zinc-400 sm:text-lg">
					don&apos;t wait for your doctor for hours to set an appointment,
					Patientrest allow you to set your appointment from your House!
				</p>
				<Link
					href="/auth/sign-in"
					className={buttonVariants({
						size: "lg",
						className: "mt-6 flex gap-2 items-center justify-between",
					})}
				>
					Get Started <ArrowRight className="w-4 h-4" />
				</Link>
				{/* value propostion section */}
				<ImageWrapper>
					<Image
						src={coverImage}
						alt="Photo for the Project"
						width={819}
						height={454}
						quality={100}
						className="rounded-xl bg-zinc-900 p-2 shadow-2xl ring-1 ring-zinc-900/10"
						priority
					/>
				</ImageWrapper>

				<div className=" mb-20 mt-20 max-w-5xl ">
					<h2 className="mt-2 font-bold text-4xl  text-primary-foreground sm:text-5xl">
						Set appointment in minutes
					</h2>
					<p className="mt-4 text-lg text-zinc-400">
						Setting appointments with doctor has never been easier than with
						Patientrest.
					</p>
				</div>
			</MaxWidthWrapper>
			{/* steps */}
			<ol className="my-6 md:mx-20 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
				<li className="md:flex-1">
					<div className="flex flex-col space-y-2 border-l-4 border-zinc-700 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
						<span className="text-sm font-medium text-primary">Step 1</span>
						<span className="text-xl font-semibold">
							Sign up for an account
						</span>
						<span className="mt-2 text-zinc-400">
							Enter your Information for better user experiance
						</span>
					</div>
				</li>
				<li className="md:flex-1">
					<div className="flex flex-col space-y-2 border-l-4 border-zinc-700 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
						<span className="text-sm font-medium text-primary">Step 2</span>
						<span className="text-xl font-semibold">
							Set your appointment with your doctor and your choosen date.
						</span>
						<span className="mt-2 text-zinc-400">
							We&apos;ll send you sms with confirmation
						</span>
					</div>
				</li>
				<li className="md:flex-1">
					<div className="flex flex-col space-y-2 border-l-4 border-zinc-700 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
						<span className="text-sm font-medium text-primary">Step 3</span>
						<span className="text-xl font-semibold">
							Go to your doctor at appointment time
						</span>
						<span className="mt-2 text-zinc-400">
							and don&apos;t wait an more!
						</span>
					</div>
				</li>
			</ol>
			<MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
				<ImageWrapper>
					<Image
						src={successImage}
						alt="success page preview"
						width={656}
						height={372}
						quality={100}
						className="rounded-xl bg-zinc-900 p-2 shadow-2xl ring-1 ring-zinc-900/10"
						priority
					/>
				</ImageWrapper>
			</MaxWidthWrapper>
		</main>
	);
}
