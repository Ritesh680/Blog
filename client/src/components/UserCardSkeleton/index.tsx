import { Skeleton } from "../Skeleton";

const UserCardSkeleton = () => {
	return (
		<>
			<div className="flex items-center gap-5 w-[500px]">
				<Skeleton className="w-10 h-10 rounded-full flex-0" />
				<Skeleton className="w-full h-5" />
			</div>
		</>
	);
};

export default UserCardSkeleton;
