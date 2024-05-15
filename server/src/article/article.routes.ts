import express from "express";
import articleController from "./article.controller";
import authMiddleware from "../middleware/auth.middleware";
import { bodyValidator } from "../middleware/zod.validator";
import articleDTO from "./dto/article.dto";
const router = express.Router();

router.get(
  "/",
  authMiddleware.checkAuthenticated,
  articleController.getAllArticles,
);
router.get(
  "/:id",
  authMiddleware.checkAuthenticated,
  articleController.getArticleById,
);

router.put(
  "/:id",
  authMiddleware.checkAuthenticated,
  bodyValidator(articleDTO),
  articleController.updateArticle,
);
router.delete(
  "/:id",
  authMiddleware.checkAuthenticated,
  articleController.deleteArticle,
);

router.post(
  "/",
  authMiddleware.checkAuthenticated,
  bodyValidator(articleDTO),
  articleController.createArticle,
);

module.exports = router;
