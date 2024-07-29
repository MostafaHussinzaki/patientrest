import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import loaderSvg from "@/assets/loader.svg";

const loading = () => {
	return (
		<MaxWidthWrapper className="mt-24 flex flex-col justify-center items-center gap-5 w-full">
			<Image
				src={loaderSvg}
				alt="loader"
				width={40}
				height={3240}
				className="animate-spin"
			/>{" "}
			<p className="text-zinc-400 text-sm">Wait a Second...</p>
		</MaxWidthWrapper>
	);
};

export default loading;
