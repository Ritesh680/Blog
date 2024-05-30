import express from "express";
import articleController from "../article/article.controller";
const router = express.Router();

router.get("/", articleController.getAllArticles);

module.exports = router;
