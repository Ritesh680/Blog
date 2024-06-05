import { UserContext } from "@/context/user.context";
import userService from "@/service/user.service";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
// import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";
import { QueryKeys } from "@/constants/QueryKeys";

const UserList = ({
	profileUser,
	currentUser,
}: {
	profileUser: UserList[];
	currentUser: UserList[];
}) => {
	// const location = useLocation();
	const { authenticated: isAuthenticated, userProfile } =
		useContext(UserContext);

	const queryClient = useQueryClient();

	// mutation function to follow user
	const followUser = useMutation({
		mutationFn: (user: UserList) => userService.followUser(user._id),

		onSuccess: async () => {
			await queryClient.invalidateQueries([QueryKeys.Users, userProfile?._id]);
		},
	});

	// mutation function to unfollow user
	const unFollowUser = useMutation({
		mutationFn: (user: UserList) => userService.unfollowUser(user._id),

		onSettled: async () => {
			await queryClient.refetchQueries([QueryKeys.Followers]);
			await queryClient.refetchQueries([QueryKeys.Following]);
			await queryClient.refetchQueries([QueryKeys.Users]);
		},
	});

	// function to handle user unfollow
	const handleUnfollow = (user: UserList) => {
		if (isAuthenticated) followUser.mutate(user);
	};

	// function to handle user follow
	const handleFollow = (user: UserList) => {
		if (isAuthenticated) unFollowUser.mutate(user);
	};

	const isFollowing = (userId: string) => {
		return currentUser.some((user) => user._id === userId);
	};

	const renderFollowButton = (user: UserList) => {
		if (user?._id === userProfile?._id) {
			return <div className="text-sm font-bold ">You</div>;
		}
		const isUserFollowed = isFollowing(user._id);

		if (isUserFollowed) {
			return (
				<div
					className="text-sm font-bold text-green-600 cursor-pointer hover:underline"
					onClick={() => handleFollow(user)}>
					Following
				</div>
			);
		} else {
			return isAuthenticated ? (
				<div
					className="text-sm font-bold text-green-600 cursor-pointer hover:underline"
					onClick={() => handleUnfollow(user)}>
					Follow
				</div>
			) : (
				// <NavLink
				//   className="text-sm font-bold text-green-600 cursor-pointer hover:underline"
				//   to="/login"
				//   state={{ prev: location.pathname }}
				// >
				//   Follow
				// </NavLink>
				<Link
					className="text-sm font-bold text-green-600 cursor-pointer hover:underline"
					to="/login"
					// onClick={() => {
					// 	setPath(location.pathname);
					//   }}
				>
					Follow
				</Link>
			);
		}
	};

	if (profileUser.length === 0)
		return (
			<div className="flex gap-2 text-xl underline cursor-default">
				No users found
			</div>
		);

	return (
		<div className="flex flex-col gap-5 ">
			{profileUser.map((user, index) => (
				<div
					key={index}
					className="flex items-center justify-between max-w-[400px]">
					<UserCard user={user} />
					{renderFollowButton(user)}
				</div>
			))}
		</div>
	);
};

export default UserList;
