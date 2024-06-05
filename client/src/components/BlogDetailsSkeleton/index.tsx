import { Skeleton } from "../Skeleton";

const BlogDetailSkeleton = () => {
	return (
		<div className="flex justify-center mx-5 mt-10 md:mx-0">
			<div className="w-[1000px]  p-5">
				<Skeleton className="w-full h-12 mb-5" />
				<Skeleton className="w-full h-8 mb-5" />

				<div className="flex items-center mb-5 space-x-4">
					<Skeleton className="w-12 h-12 rounded-full" />
					<div className="flex flex-col">
						<Skeleton className="w-full h-6 mb-2" />
						<Skeleton className="w-2/3 h-4" />
					</div>
				</div>

				<Skeleton className="w-full h-[300px] mb-5" />

				<Skeleton className="w-full h-5 mb-2" />
				<Skeleton className="w-full h-5 mb-2" />
				<Skeleton className="w-2/3 h-5 mb-5" />

				<Skeleton className="w-full h-5 mb-2" />
				<Skeleton className="w-full h-5 mb-2" />
				<Skeleton className="w-full h-5 mb-2" />
				<Skeleton className="w-4/5 h-5 mb-2" />
				<Skeleton className="w-1/3 h-5 mb-5" />
			</div>
		</div>
	);
};

export default BlogDetailSkeleton;
