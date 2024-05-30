import { NextFunction, Request, Response } from "express";
import { decodeToken, getToken } from "../utils/functions";
import articleService from "./article.service";
import ApiResponse from "../middleware/response";

class ArticleController {
	async createArticle(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;

		const { categoryId, content, title } = req.body;
		const token = getToken(authHeader)!;
		const decoded = await decodeToken(token);

		const response = await articleService.createArticle({
			authorId: decoded.userId,
			categoryId,
			content,
			title,
		});

		new ApiResponse(res).success(response, "article created", 201);
	}

	async getAllArticles(req: Request, res: Response, next: NextFunction) {
		const response = await articleService.getAllArticles();
		console.log({ response });
		new ApiResponse(res).success(response, "ALl articles", 200);
	}

	async getArticleById(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;
		const response = await articleService.getArticleById(id);
		new ApiResponse(res).success(response, "ALl articles", 200);
	}

	async updateArticle(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;
		const authHeader = req.headers.authorization;
		const token = getToken(authHeader)!;
		const decoded = await decodeToken(token);
		const { categoryId, content, title } = req.body;

		const response = await articleService.updateArticle(id, {
			authorId: decoded.userId,
			categoryId,
			content,
			title,
		});

		new ApiResponse(res).success(response, "ALl articles", 200);
	}

	async deleteArticle(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;
		const response = await articleService.deleteArticle(id);
		new ApiResponse(res).success(response, "ALl articles", 200);
	}

	async likeArticle(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;
		const token = getToken(authHeader)!;
		const decoded = await decodeToken(token);
		const articleId = req.body.articleId;

		const response = await articleService.likeArticle(
			articleId,
			decoded.userId
		);
		new ApiResponse(res).success(response, "ALl articles", 200);
	}
}

const articleController = new ArticleController();

export default articleController;
