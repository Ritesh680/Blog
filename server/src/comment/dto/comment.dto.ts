import { z } from "zod";

const createCommentDTO = z.object({
  articleId: z.string({ required_error: "ArticleId is required" }),
  commentText: z.string({ required_error: "Comment is required" }),
});
export default createCommentDTO;
