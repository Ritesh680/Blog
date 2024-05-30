import { Skeleton } from "../Skeleton";

const UserProfileSkeleton = () => {
	return (
		<div className="flex flex-col gap-5 w-[300px]">
			<Skeleton className="w-40 h-40 rounded-full" />
			<Skeleton className="w-[200px] h-6 " />
			<div className="flex gap-5">
				<Skeleton className="w-[112px] h-[30px] " />
				<Skeleton className="w-[112px] h-[30px] " />
			</div>
		</div>
	);
};

export default UserProfileSkeleton;
