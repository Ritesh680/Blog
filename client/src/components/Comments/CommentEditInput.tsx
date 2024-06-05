import { QueryKeys } from "@/constants/QueryKeys";
import commentService from "@/service/comment.service";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import InfiniteProgressBar from "../InfiniteProgressBar";
import TextArea from "antd/es/input/TextArea";
import { Button } from "../Button";
import { useEffect } from "react";

const CommentEditInput = ({
	input,
	setShowEditInput,
}: {
	input: IComment;
	setShowEditInput: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { control, handleSubmit, reset } = useForm<ICreateComment>();
	const queryClient = useQueryClient();

	//   mutation function to update the comment
	const { mutate, isLoading: isPending } = useMutation({
		mutationFn: (data: ICreateComment) =>
			commentService.updateComment(input._id, data),
		onSuccess: () => {
			setShowEditInput(false);
			queryClient.refetchQueries({
				queryKey: [QueryKeys.Comments],
			});
		},
	});

	//   function to update the comment
	const onSubmit = (data: ICreateComment) => {
		const dataForApi = { ...data, articleId: input.articleId };
		mutate(dataForApi);
	};

	useEffect(() => {
		reset({ comment: input.comment });
	}, [input, reset]);

	return (
		<div className="flex flex-col gap-3 mx-3">
			{isPending && <InfiniteProgressBar />}

			<Controller
				name="comment"
				control={control}
				defaultValue={input._id}
				render={({ field }) => <TextArea {...field} />}
			/>

			<div className="text-right">
				<Button onClick={handleSubmit(onSubmit)}>Update</Button>
			</div>
		</div>
	);
};

export default CommentEditInput;
