import express from "express";
import articleController from "./article.controller";
import authMiddleware from "../middleware/auth.middleware";
import { bodyValidator } from "../middleware/zod.validator";
import articleDTO from "./dto/article.dto";
import fileUpload from "../utils/multer";

const router = express.Router();

router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);

router.put(
	"/:id",
	authMiddleware.checkAuthenticated,
	fileUpload,
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
	fileUpload,
	bodyValidator(articleDTO),
	articleController.createArticle
);

router.post(
	"/:id/comments",
	authMiddleware.checkAuthenticated,
	articleController.addComment
);

module.exports = router;
