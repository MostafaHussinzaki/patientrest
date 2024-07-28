import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import Image from "next/image";
import registerImage from "@/assets/register-img.png";

import RegisterForm from "@/components/form/RegisterForm";

const page = () => {
	return (
		<main className="flex flex-col lg:flex-row mb-10">
			<MaxWidthWrapper className="flex-1 h-full flex flex-col gap-10 w-full">
				<div className="flex flex-col gap-8">
					<div className="mt-24 ">
						<h1 className="text-4xl text-white font-bold mb-2">Welcome 👋</h1>
						<p className="text-lg text-zinc-400">
							Let us know more about yourself.
						</p>
					</div>
				</div>

				<RegisterForm />
			</MaxWidthWrapper>
			<div className="flex-[0.5] lg:h-full rounded-sm hidden lg:block">
				<Image
					src={registerImage}
					alt="A doctor just standing"
					width={780}
					height={2196}
					quality={75}
					className=" lg:h-full rounded-sm"
					priority
				/>
			</div>
		</main>
	);
};

export default page;
