import express from "express";
import articleController from "./article.controller";
import authMiddleware from "../middleware/auth.middleware";
import { bodyValidator } from "../middleware/zod.validator";
import articleDTO from "./dto/article.dto";
const router = express.Router();

router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);

router.put(
	"/:id",
	authMiddleware.checkAuthenticated,
	bodyValidator(articleDTO),
	articleController.updateArticle
);
router.delete(
	"/:id",
	authMiddleware.checkAuthenticated,
	articleController.deleteArticle
);

router.post(
	"/like",
	authMiddleware.checkAuthenticated,
	articleController.likeArticle
);

router.post(
	"/",
	authMiddleware.checkAuthenticated,
	bodyValidator(articleDTO),
	articleController.createArticle
);

module.exports = router;
