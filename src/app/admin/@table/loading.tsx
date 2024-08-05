import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
	return (
		<div className="w-full">
			<Skeleton className="w-full h-[400px] rounded-xl" />
		</div>
	);
};

export default loading;
