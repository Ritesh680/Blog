import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema({
  title: String,
  content: String,
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
