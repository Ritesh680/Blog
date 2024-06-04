import express from "express";
import articleController from "../article/article.controller";
const router = express.Router();

router.get("/", articleController.getAllArticles);
router.post("/", articleController.createArticle);

module.exports = router;
