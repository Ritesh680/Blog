import { UserContext } from "@/context/user.context";
import userService from "@/service/user.service";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import UserCardSkeleton from "../UserCardSkeleton";
import UserList from "../UserList";

const UserFollowing = () => {
	const { userId: usersId } = useParams();
	const { authenticated: isAuthenticated, userProfile } =
		useContext(UserContext);

	// fetch profile user's following
	const profileFollowing = useQuery({
		queryKey: ["following", usersId],
		queryFn: () => userService.getUserFollowingById(usersId!),
		enabled: !!usersId,
	});

	// fetch logged in user's following
	const currentUserFollowing = useQuery({
		queryKey: ["UserFollowing", userProfile?._id],
		queryFn: () => userService.getUserFollowingById(userProfile?._id || ""),
		enabled: isAuthenticated,
	});

	const isLoading =
		profileFollowing.isLoading || currentUserFollowing.isLoading;

	return (
		<div>
			<div className="flex items-center gap-3 mb-10 text-3xl font-semibold">
				<div>Following</div>
				<div>{profileFollowing.data?.length}</div>
			</div>
			{isLoading ? (
				<UserCardSkeleton />
			) : (
				<div className="w-[400px]">
					<UserList
						profileUser={profileFollowing.data || []}
						currentUser={
							isAuthenticated ? currentUserFollowing?.data || [] : []
						}
					/>
				</div>
			)}
		</div>
	);
};

export default UserFollowing;
