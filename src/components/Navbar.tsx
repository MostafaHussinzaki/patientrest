import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
	return (
		<header className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-800 bg-background/75 backdrop-blur-lg transition-all">
			<MaxWidthWrapper className="h-full">
				<div className="flex h-full items-center justify-between w-full">
					<div>
						<h1 className="flex z-40 font-semibold text-lg ">
							<Link href="/">Patientrest</Link>
						</h1>
					</div>
					<nav>
						{/*TODO: Conditional get started or log out */}
						<Link
							href=""
							className={buttonVariants({
								size: "sm",
								className: "flex gap-2 text-[0.775rem] md:text-sm",
							})}
						>
							Get started <ArrowRight className="w-4 h-4" />
						</Link>
					</nav>
				</div>
			</MaxWidthWrapper>
		</header>
	);
};

export default Navbar;
