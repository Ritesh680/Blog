import BlogList from "@/components/BlogList";
import TabAbout from "@/components/TabAbout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import UserFollowers from "@/components/UserFollowers";
import UserFollowing from "@/components/UserFollowing";
import UserProfileSkeleton from "@/components/UserProfileSkeleton";
import { QueryKeys } from "@/constants/QueryKeys";
import userService from "@/service/user.service";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

const UserProfilePage = () => {
	const { userId } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: [QueryKeys.UserDetails, userId],
		queryFn: async () => userService.getUserById(userId!),
		enabled: !!userId,
	});
	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to the top when component mounts
	}, []);

	return (
		<div className="m-10">
			<div className="my-10 text-5xl font-semibold">Profile</div>
			{isLoading && <UserProfileSkeleton />}
			<div className="flex flex-col lg:flex-row">
				{/* user about */}
				<div className="w-[300px] flex-0">
					<TabAbout />
				</div>

				{/* user tabs */}
				<div className="flex-1 mt-10 lg:m-0">
					<Tabs defaultValue="stories" className="mb-10">
						<TabsList>
							<TabsTrigger value="stories">Stories</TabsTrigger>
							<TabsTrigger value="followers">Followers</TabsTrigger>
							<TabsTrigger value="following">Following</TabsTrigger>
						</TabsList>
						<TabsContent value="stories">
							<BlogList data={data?.articles || []} />
						</TabsContent>
						<TabsContent value="followers">
							<UserFollowers />
						</TabsContent>
						<TabsContent value="following">
							<UserFollowing />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default UserProfilePage;
