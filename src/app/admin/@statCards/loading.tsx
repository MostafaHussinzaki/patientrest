import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
	return (
		<>
			<Skeleton className="flex-1 h-[150px] rounded-xl" />
			<Skeleton className="flex-1 h-[150px] rounded-xl" />
			<Skeleton className="flex-1 h-[150px] rounded-xl" />
		</>
	);
};

export default loading;
