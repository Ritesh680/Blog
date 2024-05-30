import mongoose, { Schema, mongo } from "mongoose";

const ArticleSchema = new Schema({
	title: String,
	description: String,
	content: String,
	tag: {
		type: String,
		enum: ["featured", "popular", "trending"],
		default: "popular",
	},
	likes: [
		{
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	],
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
	],
	authorId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	categoryId: {
		type: Schema.Types.ObjectId,
		ref: "Category",
	},
	publicationDate: {
		type: Date,
		default: Date.now(),
	},
	viewsCount: { type: Number, default: 0 },
});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
