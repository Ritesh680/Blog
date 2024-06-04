import axiosInstance from "@/utils/axios";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import InfiniteProgressBar from "../InfiniteProgressBar";
import { Label } from "../Label";
import TextArea from "antd/es/input/TextArea";
import { Button } from "../Button";

const CommentInput = () => {
	const { blogId } = useParams();
	const { register, handleSubmit } = useForm();
	const queryClient = useQueryClient();

	//   mutation function to submit user comment
	const { mutate, isLoading } = useMutation({
		mutationFn: (data) =>
			axiosInstance("post", `/blogs/${blogId}/comments`, data),

		onSuccess: () => {},
	});

	//   function to submit comments
	const onSubmit = (data: any) => {
		mutate(data);
	};

	return (
		<div>
			{isLoading && <InfiniteProgressBar />}
			<div className="flex flex-col gap-5 ">
				<div className="text-muted-foreground">What are your thoughts?</div>

				<div className="flex gap-4">
					<Label className="text-right">Comment</Label>
					<TextArea name="comment" />
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
