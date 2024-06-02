import { formatDate } from "@/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { Link } from "react-router-dom";
import { Badge } from "@/Badge";
import {
	BookOutlined,
	HeartOutlined,
	MessageOutlined,
	ShareAltOutlined,
} from "@ant-design/icons";

interface Props {
	data: IArticle;
}

const BlogCard = ({ data }: Props) => {
	const {
		title,
		description,
		user,
		likes,
		comments,
		picture,
		publicationDate,
		_id,
		tag,
	} = data;

	// function to format date
	const date = formatDate(new Date(publicationDate));

	return (
		<div className="flex flex-col  bg-white p-4 space-y-3 border shadow overflow-hidden h-full self-stretch   rounded-lg  w-[320px]">
			{/* card header */}
			<div className="flex space-x-4 ">
				<Avatar>
					<AvatarImage src="" alt="@shadcn" />
					<AvatarFallback>{data.user?.username?.slice(0, 2)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col space-y-0.5">
					<Link
						to={`/users/${data?.user?._id}`}
						className="text-sm font-semibold">
						{user?.username}
					</Link>
					<span className="text-xs text-muted-foreground">{date}</span>
				</div>
			</div>

			{/* card body */}
			<div className="flex-1">
				<img
					src={`http://localhost:5000/${picture}`}
					alt="cover image"
					className="object-cover w-full mb-4 rounded-lg h-44"
				/>
				<Link
					to={`/blogs/${_id}`}
					className="mb-1 text-xl font-semibold transition-all duration-200 hover:underline">
					{title}
				</Link>
				<p className="mt-2 text-sm text-muted-foreground">{description}</p>
			</div>
			<div>
				<Badge tagId={tag?._id}>{tag.name}</Badge>
			</div>

			{/* card footer */}
			<div className="flex flex-wrap justify-between flex-0">
				<div className="space-x-2">
					<button
						aria-label="Share this post"
						type="button"
						className="p-2 text-center">
						<ShareAltOutlined className="w-5 h-5" />
					</button>
					<button aria-label="Bookmark this post" type="button" className="p-2">
						<BookOutlined className="w-5 h-5" />
					</button>
				</div>
				<div className="flex space-x-2 text-sm">
					<button type="button" className="flex items-center p-1 space-x-1.5">
						<MessageOutlined className="w-5 h-5" />
						<span>{comments.length}</span>
					</button>

					<button type="button" className="flex items-center p-1 space-x-1.5">
						{/* <ThumbsUp className="w-5 h-5" /> */}
						<HeartOutlined />
						<span>{likes.length}</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
