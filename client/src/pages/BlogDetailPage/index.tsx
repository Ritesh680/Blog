import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import MarkdownEditor from "@uiw/react-markdown-editor";

import { Separator } from "@/components/Separator";
import articleService from "@/service/article.service";
import { formatDate } from "@/utils/utils";
import InfiniteProgressBar from "@/components/InfiniteProgressBar";
import { Badge } from "@/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { UserContext } from "@/context/user.context";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import {
	EllipsisOutlined,
	HeartFilled,
	HeartOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";
import { QueryKeys } from "@/constants/QueryKeys";
import userService from "@/service/user.service";
import Comment from "@/components/Comments";

const BlogDetailPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to the top when component mounts
	}, []);

	const { blogId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { authenticated: isAuthenticated, userProfile } =
		useContext(UserContext);

	// fetching the blog details
	const { data, isLoading } = useQuery({
		queryKey: ["blogs", blogId],
		queryFn: () => articleService.getArticleById(blogId!),
		enabled: !!blogId,
	});

	// fetching the following of the author
	const following = useQuery({
		queryKey: [QueryKeys.Following, userProfile?._id],
		queryFn: () => userService.getUserFollowingById(userProfile?._id),
		enabled: !!userProfile?._id,
	});

	// handle blog Edit function
	const handleEdit = () => {
		navigate(`/edit-blog/${data?._id}`);
	};

	//mutation query for blog deletion
	const deleteBlog = useMutation({
		mutationFn: () => articleService.deleteArticle(blogId!),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["blogs"], exact: true });

			navigate("/");
		},
	});

	// mutation query for liking a blog
	// const likeBlog = useMutation({
	//   mutationFn: () => articleService.likeArticle(blogId!),

	// 	// onError: (error) => {
	// 	// 	toast({
	// 	// 		variant: "destructive",
	// 	// 		title: error.response.data || error.message || "something went wrong",
	// 	// 	});
	// 	// },

	// 	onMutate: async () => {
	// 		// Optimistically update the local cache
	// 		queryClient.setQueryData(["blogs", blogId], (prev) => {
	// 			if (prev) {
	// 				return {
	// 					...prev,

	// 					// Simulate adding a like optimistically
	// 					likes: [...prev.likes, { _id: id }],
	// 				};
	// 			}
	// 			return prev;
	// 		});
	// 	},

	// 	onSettled: () => {
	// 		queryClient.refetchQueries({
	// 			queryKey: ["blogs", blogId],
	// 		});
	// 	},
	// });

	// mutation query for unliking a blog
	// const unLikeBlog = useMutation({
	// 	mutationFn: () =>
	// 		instance.delete(`/blogs/${blogId}/unlike`, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		}),

	// 	onError: () => {
	// 		toast({
	// 			variant: "destructive",
	// 			title: error.response.data || error.message || "something went wrong",
	// 		});
	// 	},

	// 	onMutate: () => {
	// 		queryClient.setQueryData(["blogs", blogId], (prev) => {
	// 			if (prev) {
	// 				return {
	// 					...prev,
	// 					likes: prev.likes.filter((likeId) => likeId._id !== id),
	// 				};
	// 			}
	// 			return prev;
	// 		});
	// 	},

	// 	onSettled: () => {
	// 		queryClient.refetchQueries({
	// 			queryKey: ["blogs", blogId],
	// 		});
	// 	},
	// });

	// mutation function to follow
	// const followUser = useMutation({
	// 	mutationFn: () =>
	// 		instance.post(
	// 			`/users/${data.user._id}/follow`,
	// 			{},
	// 			{
	// 				headers: { Authorization: `Bearer ${token}` },
	// 			}
	// 		),

	// 	onError: (error) => {
	// 		toast({
	// 			variant: "destructive",
	// 			title: error.response.data || error.message || "something went wrong",
	// 		});
	// 	},
	// 	onMutate: () => {
	// 		// Optimistically update the local cache
	// 		queryClient.setQueryData(["following", id], (prev) => {
	// 			if (prev) {
	// 				return {
	// 					...prev,
	// 					following: [...prev.following, { _id: data?.user?._id }],
	// 				};
	// 			}
	// 			return prev;
	// 		});
	// 	},
	// 	onSettled: () => {
	// 		queryClient.refetchQueries({
	// 			queryKey: ["blogs", blogId],
	// 		});
	// 	},
	// });

	// mutation function to unfollow
	// const unFollowUser = useMutation({
	// 	mutationFn: () =>
	// 		instance.delete(`/users/${data.user._id}/unfollow`, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		}),

	// 	onError: (error) => {
	// 		toast({
	// 			variant: "destructive",
	// 			title: error.response.data || error.message || "something went wrong",
	// 		});
	// 	},
	// 	onMutate: () => {
	// 		// Optimistically update the local cache
	// 		queryClient.setQueryData(["following", id], (prev) => {
	// 			if (prev) {
	// 				return {
	// 					...prev,
	// 					following: prev.following.filter(
	// 						(author) => author._id !== data?.user?._id
	// 					),
	// 				};
	// 			}
	// 			return prev;
	// 		});
	// 	},
	// 	onSettled: () => {
	// 		queryClient.refetchQueries({
	// 			queryKey: ["blogs", blogId],
	// 		});
	// 	},
	// });

	// handle blog delete function
	const handleDelete = () => {
		deleteBlog.mutate();
	};

	// // handle like
	// const handleLike = () => {
	// 	if (isAuthenticated) likeBlog.mutate();
	// };

	// // handle unlike
	// const handleUnlike = () => {
	// 	if (isAuthenticated) unLikeBlog.mutate();
	// };

	// // handle follow user
	// const handleFollow = () => {
	// 	if (isAuthenticated) followUser.mutate();
	// };

	// handle unfollow user
	// const handleUnfollow = () => {
	// 	if (isAuthenticated) unFollowUser.mutate();
	// };

	// if (isLoading)
	// 	return (
	// 		<div>
	// 			<BloagDetailSkeleton />
	// 		</div>
	// 	);

	const copyURLToClipboard = () => {
		const urlToCopy = window.location.href;

		// Using the Clipboard API to copy the URL
		navigator.clipboard.writeText(urlToCopy);
	};

	const date = formatDate(new Date(data?.publicationDate as string));

	if (isLoading || !data) return <div>Loading...</div>;

	return (
		<>
			{deleteBlog.isLoading && <InfiniteProgressBar />}
			<div className="z-10 flex justify-center pt-10 pb-10 mx-5 bg-background lg:px-0">
				<div className="w-[1000px] overflow-hidden  p-5">
					{data?.tag && (
						<div>
							<Badge tagId={data.tag} className="mb-5">
								{data.tag}
							</Badge>
						</div>
					)}

					{/* blog title */}
					<div className="mb-5 text-5xl font-semibold">{data?.title}</div>

					{/* blog description */}
					<div className="mb-5 text-xl text-muted-foreground">
						{data?.description}
					</div>

					{/* avatar */}
					<div className="flex flex-wrap items-center justify-between">
						<div className="flex mb-5 space-x-4">
							<Avatar>
								<AvatarImage
									src={`${import.meta.env.VITE_API_URL}/${
										data?.user?.[0]?.imagePath?.[0]
									}`}></AvatarImage>
								<AvatarFallback>
									{data.user?.[0]?.username?.slice(0, 2)}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col space-y-0.5">
								<div className="flex gap-5 ">
									<Link
										to={`/users/${data.user?.[0]?._id}`}
										className="text-sm font-semibold">
										{data.user?.[0]?.username}
									</Link>

									{/* follow and unfollow link */}
									{isAuthenticated &&
										data?.user?.[0]?._id !== userProfile?._id && (
											<div className="text-sm font-semibold text-green-600 cursor-pointer hover:underline">
												{following?.data?.some(
													(following) => following._id == data?.user?.[0]._id
												) ? (
													<div>Following</div>
												) : (
													<div>Follow</div>
												)}
											</div>
										)}
								</div>

								<span className="text-xs text-muted-foreground">{date}</span>
							</div>
						</div>

						{/* conditonally rendering the edit and delete menu icon */}
						{data?.user?.[0]?._id === userProfile?._id && (
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<EllipsisOutlined />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem
											onClick={() => {
												handleEdit();
											}}>
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem onClick={handleDelete}>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)}
					</div>

					<Separator />

					<div className="flex flex-wrap items-center justify-between">
						<div className="space-x-2">
							<button
								aria-label="Share this post"
								type="button"
								className="p-1 text-center hover:underline"
								onClick={copyURLToClipboard}>
								<ShareAltOutlined className="w-5 h-5" />
								Share
							</button>
						</div>

						{/* {/* thumbsup and comment */}
						{isAuthenticated ? (
							<div className="flex space-x-4 ">
								<button
									type="button"
									className="flex items-center p-1 space-x-1.5">
									{/* comment component */}
									<Comment />
									<span>{data.comments.length}</span>
								</button>

								{data.likes.some((like) => like._id === userProfile._id) ? (
									<button
										type="button"
										className="flex items-center p-1 space-x-1.5">
										<HeartFilled />
										<span>{data.likes.length}</span>
									</button>
								) : (
									<button
										type="button"
										className="flex items-center p-1 space-x-1.5 ">
										<HeartOutlined />
										<span>{data.likes.length}</span>
									</button>
								)}
							</div>
						) : (
							<div className="flex space-x-4 ">
								<button
									type="button"
									className="flex items-center p-1 space-x-1.5">
									{/* comment component */}
									<Comment />
									<span>{data.comments.length}</span>
								</button>

								{data.likes.some((like) => like._id === userProfile._id) ? (
									<button
										type="button"
										className="flex items-center p-1 space-x-1.5"
										// onClick={handleUnlike}
									>
										<HeartFilled />
										<span>{data.likes.length}</span>
									</button>
								) : (
									<Link
										to="/login"
										type="button"
										className="flex items-center p-1 space-x-1.5 ">
										<HeartOutlined />
										<span>{data.likes.length}</span>
									</Link>
								)}
							</div>
						)}
					</div>
					<Separator className="mb-5" />
					<img
						src={`${import.meta.env.VITE_API_URL}/${data.filesPath?.[0]}`}
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = "https://via.placeholder.com/150";
						}}
						alt="cover image"
						className="object-cover w-full mb-5 rounded-lg "
					/>

					<MarkdownEditor.Markdown
						source={data.content}
						className="bg-gray-200 text-black p-4"
					/>
				</div>
			</div>
		</>
	);
};

export default BlogDetailPage;
