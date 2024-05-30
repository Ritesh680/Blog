import userService from "@/service/user.service";
import { useQuery } from "react-query";
import { Skeleton } from "../Skeleton";
import UserCard from "../UserCard";
import { Link } from "react-router-dom";

const FeaturedPeople = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["users", "featured"],
		queryFn: userService.getAllUsers,
	});

	if (isLoading) return <Skeleton className="w-full h-[300px]" />;

	return (
		<div className="py-5">
			<div className="mb-4 text-3xl font-semibold">Who to follow</div>
			<div className="flex flex-col max-w-full gap-4 overflow-x-auto">
				{data?.map((user) => (
					<div key={user._id}>
						<UserCard user={user} />
					</div>
				))}
			</div>
			<div className="mt-4 text-green-600 cursor-pointer hover:underline">
				<Link to="/users">See more people</Link>
			</div>
		</div>
	);
};

export default FeaturedPeople;
