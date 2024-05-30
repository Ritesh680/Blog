import { UserContext } from "@/context/user.context";
import userService from "@/service/user.service";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import UserCardSkeleton from "../UserCardSkeleton";
import UserList from "../UserList";
import { QueryKeys } from "@/constants/QueryKeys";

const UserFollowers = () => {
	const { userId: usersId } = useParams();
	const { authenticated: isAuthenticated } = useContext(UserContext);

	// fetch profile user's followers
	const profileFollowers = useQuery({
		queryKey: [QueryKeys.Followers, usersId],
		queryFn: () => userService.getUserFollowerById(usersId!),
		enabled: !!usersId,
	});

	// fetch logged in user's followers
	const currentUserFollowing = useQuery({
		queryKey: [QueryKeys.Following, usersId],
		queryFn: () => userService.getUserFollowingById(usersId!),

		enabled: !!usersId,
	});

	const isLoading =
		profileFollowers.isLoading || currentUserFollowing.isLoading;

	return (
		<div>
			<div className="flex gap-3 mb-10 text-3xl font-semibold ">
				<div>Followers</div>
				<div>{profileFollowers.data?.length ?? "0"}</div>
			</div>
			{isLoading ? (
				<UserCardSkeleton />
			) : (
				<div className="w-[400px]">
					<UserList
						profileUser={profileFollowers.data || []}
						currentUser={
							isAuthenticated ? currentUserFollowing?.data || [] : []
						}
					/>
				</div>
			)}
		</div>
	);
};

export default UserFollowers;
