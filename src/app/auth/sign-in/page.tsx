import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SignInForm from "@/components/form/SignInForm";

import onBoardingImage from "@/assets/onboarding-img.png";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const page = () => {
	return (
		<main className="flex flex-col lg:flex-row mb-6 lg:mb-0 lg:h-[calc(100vh-3.5rem)]">
			<MaxWidthWrapper className="flex-1 h-full flex flex-col justify-center items-center">
				<div className="flex flex-col gap-8">
					<div className="mt-24 lg:mt-0">
						<h1 className="text-4xl text-white font-bold mb-2">
							Hi there, ...
						</h1>
						<p className="text-lg text-zinc-400">
							Get started with Appointments.
						</p>
					</div>
					<SignInForm />
				</div>
				<div className="flex items-center justify-between w-full mt-10">
					<span className="text-zinc-400 text-sm">&#169;2024 patientrest</span>
					<Button variant="link" className="self-end">
						Admin
					</Button>
				</div>
			</MaxWidthWrapper>
			<div className="flex-1 lg:h-full rounded-md max-w-lg mx-auto my-10 lg:my-0 px-4 lg:px-0">
				<Image
					src={onBoardingImage}
					alt="A doctor just standing"
					width={1192}
					height={1025}
					quality={75}
					className=" lg:h-full rounded-md"
					priority
				/>
			</div>
		</main>
	);
};

export default page;
