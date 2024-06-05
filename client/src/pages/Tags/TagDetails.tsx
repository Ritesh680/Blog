import { useContext, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";

import BlogHorizontalCard from "@/components/BlogHorizontalCard";
import BlogList from "@/components/BlogList";
import { Skeleton } from "@/components/Skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import UserCardSkeleton from "@/components/UserCardSkeleton";
import { QueryKeys } from "@/constants/QueryKeys";
import { UserContext } from "@/context/user.context";
import tagService from "@/service/tags.service";
import UserList from "@/components/UserList";

const TagDetailPage = () => {
	const { tagId } = useParams();
	const {
		authenticated: isAuthenticated,
		userProfile,
		fetchProfile,
	} = useContext(UserContext);

	const queryClient = useQueryClient();
	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to the top when component mounts
	}, []);

	// query function to fetch tag details
	const tagDetails = useQuery({
		queryKey: [QueryKeys.Tags, tagId],
		queryFn: async () => tagService.getTagById(tagId!),
		enabled: !!tagId,
	});

	// mutation function to follow tag
	const followTag = useMutation({
		mutationFn: () => tagService.addFollower(tagId!),
		onMutate: () => {
			// Optimistically update the local cache
			const previousUserData = queryClient.getQueryData([
				QueryKeys.Users,
				userProfile?._id,
			]);
			const previousTagDetails = queryClient.getQueryData([
				QueryKeys.Tags,
				tagId,
			]);

			queryClient.setQueryData<UserList | undefined>(
				[QueryKeys.Users, userProfile?._id],
				(prev) => {
					if (prev) {
						return {
							...prev,
							tagsFollowing: [...prev.tagsFollowing, tagId!],
						};
					}
					return prev;
				} // Add the type assertion here
			);

			queryClient.setQueryData<ITagsWithArticles | undefined>(
				[QueryKeys.Tags, tagId],
				(prev) => {
					if (prev) {
						return {
							...prev,
							followers: {
								...prev.followers,
								...{ _id: userProfile?._id },
							},
						};
					}
					return prev;
				}
			);
			return { previousUserData, previousTagDetails };
		},

		onSettled: async () => {
			await queryClient.invalidateQueries([QueryKeys.Tags, tagId]);
			await queryClient.invalidateQueries([QueryKeys.Users, userProfile?._id]);
		},
		onSuccess: () => {
			fetchProfile();
		},
	});

	// // mutation function to unfollow tag
	const unFollowTag = useMutation({
		mutationFn: () => tagService.removeFollower(tagId!),
		onMutate: () => {
			// Optimistically update the local cache for both user and tag
			const previousUserData = queryClient.getQueryData<ApiResponse<UserList>>([
				QueryKeys.Users,
				userProfile?._id,
			]);
			const previousTagDetails = queryClient.getQueryData([
				QueryKeys.Tags,
				tagId,
			]);

			queryClient.setQueryData<UserList | undefined>(
				[QueryKeys.Users, userProfile?._id],
				(prev) => {
					if (prev) {
						return {
							...prev,
							tagsFollowing: prev?.tagsFollowing?.filter(
								(tag) => tag !== tagId
							),
						};
					}
					return prev;
				}
			);

			queryClient.setQueryData<ApiResponse<ITagsWithArticles> | undefined>(
				[QueryKeys.Tags, tagId],
				(prev) => {
					if (prev) {
						return {
							...prev,
							followers: prev.data?.followers?.filter(
								(follower) => follower._id !== userProfile?._id
							),
						};
					}
					return prev;
				}
			);

			return { previousUserData, previousTagDetails };
		},
		onSettled: async () => {
			await queryClient.invalidateQueries([QueryKeys.Tags, tagId]);
			await queryClient.invalidateQueries([QueryKeys.Users, userProfile?._id]);
		},
		onSuccess: () => {
			fetchProfile();
		},
	});

	const handleFollowTag = () => {
		if (isAuthenticated) followTag.mutate();
	};

	const handleUnfollowTag = () => {
		if (isAuthenticated) unFollowTag.mutate();
	};

	return (
		<div className="m-10">
			{/* on loading skeleton */}
			<div>
				<div className="mb-10 text-5xl font-semibold">Tag</div>
				<div className="flex flex-col lg:flex-row">
					{tagDetails.isLoading || !userProfile ? (
						<div className="w-[300px]">
							<Skeleton className="h-[40px] w-[200px] mb-5" />
							<div className="flex gap-5 mb-10">
								<Skeleton className="h-[25px] w-[100px] " />
								<Skeleton className="h-[25px] w-[100px]" />
							</div>
						</div>
					) : (
						<div className="w-[300px] flex-0">
							<div className="flex items-baseline gap-3 mb-3 ">
								<div className="text-3xl font-semibold capitalize">
									{tagDetails.data?.data?.name}
								</div>

								{isAuthenticated && (
									<div>
										{userProfile?.tagsFollowing?.find(
											(tag) => tag === tagId
										) ? (
											<div
												onClick={handleUnfollowTag}
												className="font-semibold text-green-600 cursor-pointer hover:underline">
												Following
											</div>
										) : (
											<div
												onClick={handleFollowTag}
												className="font-semibold text-green-600 cursor-pointer hover:underline">
												Follow
											</div>
										)}
									</div>
								)}
							</div>
							<div className="flex gap-5 mb-10">
								<div className="font-semibold text-muted-foreground">
									Stories&nbsp;{tagDetails?.data?.data?.articles?.length}
								</div>
								<div className="font-semibold text-muted-foreground">
									Followers&nbsp;
									{tagDetails?.data?.data?.followers?.length}
								</div>
							</div>
						</div>
					)}

					{/* <BlogList data={tagDetails?.data?.data?.[0]?.articles || []} /> */}

					<div className="flex-1">
						<Tabs defaultValue="stories" className="mb-10">
							<TabsList>
								<TabsTrigger value="stories">Stories</TabsTrigger>
								<TabsTrigger value="followers">Followers</TabsTrigger>
							</TabsList>
							<TabsContent value="stories">
								<div className="mb-10 text-3xl font-semibold">Stories</div>
								{tagDetails.isLoading || !userProfile ? (
									<div className="flex flex-col gap-5">
										<BlogHorizontalCard />
										<BlogHorizontalCard />
									</div>
								) : (
									<BlogList data={tagDetails?.data?.data?.articles || []} />
								)}
							</TabsContent>
							<TabsContent value="followers">
								<div className="w-[400px]">
									<div className="mb-10 text-3xl font-semibold">Followers</div>
									{tagDetails.isLoading || !userProfile ? (
										<UserCardSkeleton />
									) : (
										<UserList
											profileUser={tagDetails?.data?.data?.followers || []}
											currentUser={
												isAuthenticated ? userProfile?.followers : []
											}
										/>
									)}
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TagDetailPage;
