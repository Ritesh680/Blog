import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Avatar, Badge } from "antd";
import MarkdownEditor from "@uiw/react-markdown-editor";

import { Separator } from "@/components/Separator";
import articleService from "@/service/article.service";
import { formatDate } from "@/utils/utils";
import InfiniteProgressBar from "@/components/InfiniteProgressBar";

const BlogDetailPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to the top when component mounts
	}, []);

	const { blogId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	// fetching the blog details
	const { data, isLoading } = useQuery({
		queryKey: ["blogs", blogId],
		queryFn: () => articleService.getArticleById(blogId!),
		enabled: !!blogId,
	});

	// fetching the following of the author
	// const following = useQuery({
	// 	queryKey: ["following", id],
	// 	queryFn: async () => {
	// 		const response = await instance.get(`/users/${id}/following`);
	// 		return response.data;
	// 	},
	// 	enabled: !!id,
	// });

	// handle blog Edit function
	// const handleEdit = () => {
	// 	navigate(`/edit-blog/${data?._id}`);
	// };

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
	// 			console.log(prev);
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
	// 			console.log(prev);
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
	// const handleDelete = () => {
	// 	deleteBlog.mutate();
	// };

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

	// const copyURLToClipboard = () => {
	// 	const urlToCopy = window.location.href;

	// 	// Using the Clipboard API to copy the URL
	// 	navigator.clipboard
	// 		.writeText(urlToCopy)
	// 		.then(() => {
	// 			toast({
	// 				title: "url copied",
	// 				description: urlToCopy,
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			toast({
	// 				variant: "destructive",
	// 				title: "Failed to copy URL to clipboard",
	// 				description: err,
	// 			});
	// 		});
	// };

	const date = formatDate(new Date(data?.publicationDate as string));

	if (isLoading || !data) return <div>Loading...</div>;

	return (
		<>
			{deleteBlog.isLoading && <InfiniteProgressBar />}
			<div className="z-10 flex justify-center pt-10 pb-10 mx-5 bg-background lg:px-0">
				<div className="w-[1000px] overflow-hidden  p-5">
					{data?.tag && (
						<div>
							<Badge className="mb-5">{data.tag.name}</Badge>
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
							<Avatar>{data.user?.username.slice(0, 2)}</Avatar>
							<div className="flex flex-col space-y-0.5">
								<div className="flex gap-5 ">
									<Link
										to={`/users/${data.user?._id}`}
										className="text-sm font-semibold">
										{data.user?.username}
									</Link>

									{/* follow and unfollow link */}
									{/* {isAuthenticated && data?.user?._id !== id && (
										<div className="text-sm font-semibold text-green-600 cursor-pointer hover:underline">
											{following?.data?.following.some(
												(following) => following._id == data?.user?._id
											) ? (
												<div onClick={handleUnfollow}>Following</div>
											) : (
												<div onClick={handleFollow}>Follow</div>
											)}
										</div>
									)} */}
								</div>

								<span className="text-xs text-muted-foreground">{date}</span>
							</div>
						</div>

						{/* conditonally rendering the edit and delete menu icon */}
						{/* {id === data.user._id && (
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger>
										<Ellipsis />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem
											onClick={() => {
												handleEdit();
											}}>
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => {
												handleDelete(blogId);
											}}>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						)} */}
					</div>

					<Separator />

					{/* <div className="flex flex-wrap items-center justify-between">
						<div className="space-x-2">
							<button
								aria-label="Share this post"
								type="button"
								className="p-1 text-center"
								onClick={copyURLToClipboard}>
								<FaShareAlt className="w-5 h-5" />
							</button>
						</div>

						{/* thumbsup and comment */}

					{/* </div> */}
					<Separator className="mb-5" />
					<img
						src={`${data.picture}`}
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = "https://via.placeholder.com/150";
						}}
						alt="cover image"
						className="object-cover w-full mb-5 rounded-lg "
					/>

					<MarkdownEditor.Markdown source={data.content} />
				</div>
			</div>
		</>
	);
};

export default BlogDetailPage;
