import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import InfiniteProgressBar from "../InfiniteProgressBar";
import { Label } from "../Label";
import TextArea from "antd/es/input/TextArea";
import { Button } from "../Button";
import commentService from "@/service/comment.service";
import { QueryKeys } from "@/constants/QueryKeys";

const CommentInput = () => {
	const { blogId } = useParams();
	const { handleSubmit, control, reset } = useForm<ICreateComment>();
	const queryClient = useQueryClient();

	//   mutation function to submit user comment
	const { mutate, isLoading } = useMutation({
		mutationFn: (data: ICreateComment) => commentService.addComment(data),

		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: [QueryKeys.Comments],
			});
			queryClient.refetchQueries({
				queryKey: [QueryKeys.Blogs],
			});
			reset();
		},
	});

	//   function to submit comments
	const onSubmit = (data: ICreateComment) => {
		if (blogId && data.comment) {
			const dataForAPi = { articleId: blogId, comment: data.comment };
			mutate(dataForAPi);
		}
	};

	return (
		<div>
			{isLoading && <InfiniteProgressBar />}
			<div className="flex flex-col gap-5 ">
				<div className="text-muted-foreground">What are your thoughts?</div>

				<div className="flex gap-4">
					<Label className="text-right">Comment</Label>
					<Controller
						control={control}
						name="comment"
						render={({ field }) => <TextArea {...field} />}
					/>
				</div>

				<div className="text-right">
					<Button onClick={handleSubmit(onSubmit)} disabled={isLoading}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CommentInput;
