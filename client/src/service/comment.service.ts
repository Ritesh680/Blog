import axiosInstance from "@/utils/axios";

class CommentService {
	async addComment(data: { articleId: string; comment: string }) {
		return await axiosInstance("post", `/comments`, data);
	}

	async getAllComments(id: string) {
		const res = await axiosInstance<ApiResponse<IComment[]>>(
			"get",
			`/comments/${id}`
		);
		if (res instanceof Error) {
			throw new Error(res.message);
		}
		return res.data;
	}

	async updateComment(id: string, data: { comment: string }) {
		return await axiosInstance("put", `/comments/${id}`, data);
	}

	async deleteComment(id: string) {
		return await axiosInstance("delete", `/comments/${id}`);
	}
}
const commentService = new CommentService();
export default commentService;
