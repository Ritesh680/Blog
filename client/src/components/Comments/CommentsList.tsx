import { QueryKeys } from "@/constants/QueryKeys";
import commentService from "@/service/comment.service";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import CommentCard from "./CommentCard";

const CommentList = () => {
	const { blogId } = useParams();

	const { data, error, isLoading } = useQuery({
		queryKey: [QueryKeys.Comments, blogId],
		queryFn: () => commentService.getAllComments(blogId!),
		enabled: !!blogId,
	});

	// if (isLoading) return <CommentCardSkeleton />;

	if (data?.length === 0) {
		return <div className="text-muted-foreground"> No comments yet</div>;
	}

	return (
		<div>
			{data?.map((data) => (
				<div key={data._id}>
					<CommentCard data={data} />
				</div>
			))}
		</div>
	);
};

export default CommentList;
