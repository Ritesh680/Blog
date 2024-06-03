import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../Dialog";
import { Input } from "../Input";
import UserCard from "../UserCard";

import { SearchOutlined } from "@ant-design/icons";

interface IResponse {
	user: IUser[];
	isLoading: boolean;
}

const SearchBar = () => {
	const [searchInput, setSearchInput] = useState("");
	const [response, _setResponse] = useState<IResponse>({
		user: [],
		isLoading: false,
	});
	const [open, setOpen] = useState(false);

	const closeDialog = () => {
		setOpen(false);
	};

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		if (cancelToken) {
	// 			cancelToken.cancel("Previous request cancelled");
	// 		}
	// 		// Create a new cancel token for the current request
	// 		cancelToken = axios.CancelToken.source();

	// 		if (!searchInput.trim()) return;

	// 		try {
	// 			const response = await instance.get(`/search/${searchInput}`, {
	// 				cancelToken: cancelToken.token,
	// 			});
	// 			setResponse(response.data);
	// 			// Handle the response data as needed
	// 		} catch (error) {
	// 			if (axios.isCancel(error)) {
	// 			} else {
	// 			}
	// 		}
	// 	};

	// 	fetchData();

	// 	// Cleanup function to cancel the request when the component unmounts
	// 	return () => {
	// 		if (cancelToken) {
	// 			cancelToken.cancel("Component unmounted");
	// 		}
	// 	};
	// }, [searchInput]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div
					className="border border-foreground rounded-full text-sm w-[200px] px-2 py-1 text-muted-foreground flex justify-between items-center"
					onClick={() => {
						setOpen(true);
						setSearchInput("");
					}}>
					Search <SearchOutlined />
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg min-h-xl">
				<DialogHeader>
					<DialogTitle>Search</DialogTitle>
				</DialogHeader>
				<Input
					id="search"
					placeholder="Search"
					name="search"
					className="col-span-3"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<div>
					{response.isLoading ? <div>Loading...</div> : null}
					{searchInput !== "" &&
						response && ( // Additional check for response
							<div>
								<div>
									<div className="mb-3 text-foreground">People</div>
									<div className="flex flex-col gap-3 mb-3">
										{response?.user?.length > 0 ? (
											response.user.map((user) => (
												<span key={user._id} onClick={closeDialog}>
													<UserCard user={user} />
												</span>
											))
										) : (
											<div className="text-sm text-muted-foreground">
												No users found
											</div>
										)}
									</div>
								</div>
								{/* <div>
									<div className="mb-3 text-foreground">Tag</div>
									<div className="flex flex-wrap gap-3 mb-3">
										{response?.tag?.length > 0 ? (
											response.tag.map((tag) => (
												<span key={tag._id} onClick={closeDialog}>
													<Badge tagId={tag._id}>{tag.name}</Badge>
												</span>
											))
										) : (
											<div className="text-sm text-muted-foreground">
												No tags found
											</div>
										)}
									</div>
								</div> */}
								{/* <div>
									<div className="mb-3 text-muted-foreground">Blog</div>
									<div className="flex flex-col gap-3 mb-3">
										{response?.blog?.length > 0 ? (
											response.blog.map((blog) => (
												<Link
													key={blog._id}
													to={`/blogs/${blog._id}`}
													className="text-ellipsis">
													<span onClick={closeDialog}>{blog.title}</span>
												</Link>
											))
										) : (
											<div className="text-sm text-muted-foreground">
												No blogs found
											</div>
										)}
									</div>
								</div> */}
							</div>
						)}
				</div>

				<DialogFooter>
					{/* Add buttons or additional content as needed */}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default SearchBar;
