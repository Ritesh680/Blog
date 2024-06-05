import axiosInstance from "@/utils/axios";

class ArticleService {
	async getArticles() {
		const response = await axiosInstance<ApiResponse<ArticleList[]>>(
			"get",
			"/article"
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response.data;
	}
	async getArticleById(id: string) {
		const response = await axiosInstance<ApiResponse<ArticleList>>(
			"get",
			`/article/${id}`
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response.data;
	}

	async getArticlesByTagId(tagId: string) {
		const response = await axiosInstance<ApiResponse<ArticleList[]>>(
			"get",
			`/article/tag/${tagId}`
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response.data;
	}

	async likeArticle(articleId: string) {
		const response = await axiosInstance<ApiResponse<ArticleList>>(
			"post",
			`/article/${articleId}/like`
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response.data;
	}
	async unlikeArticle(articleId: string) {
		const response = await axiosInstance<ApiResponse<ArticleList>>(
			"delete",
			`/article/${articleId}/like`
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response.data;
	}

	async deleteArticle(articleId: string) {
		const response = await axiosInstance<ApiResponse<ArticleList>>(
			"delete",
			`/article/${articleId}`
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response.data;
	}

	async createArticle(data: ICreateArticle) {
		const response = await axiosInstance<ApiResponse<ICreateArticleResponse>>(
			"post",
			`/article`,
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response.data;
	}

	async updateArticle(blogId: string, data: ICreateArticle) {
		const response = await axiosInstance<ApiResponse<ICreateArticleResponse>>(
			"put",
			`/article/${blogId}`,
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		if (response instanceof Error) {
			throw new Error(response.message);
		}
		return response.data;
	}
}

const articleService = new ArticleService();
export default articleService;
