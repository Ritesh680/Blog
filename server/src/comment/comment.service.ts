import Comment from "./comment.model";

interface ICreateComment {
  articleId: string;
  userId: string;
  commentText: string;
}

class CommentService {
  comment = Comment;

  async createComment(body: ICreateComment) {
    const response = await this.comment.create(body);
    return response;
  }

  async getCommentById(id: string) {
    const response = await this.comment.findById(id);
    return response;
  }

  async getAllComment() {
    return await this.comment.find();
  }

  async deleteComment(id: string) {
    return await this.comment.findByIdAndDelete(id);
  }

  async updateComment(id: string, body: ICreateComment) {
    return await this.comment.findByIdAndUpdate(id, body);
  }
}

const commentService = new CommentService();
export default commentService;
