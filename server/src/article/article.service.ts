import Article from "./article.model";

interface ICreateArticle {
  title: string;
  content: string;
  authorId: string;
  categoryId: string;
}
class ArticleService {
  article = Article;

  async createArticle(body: ICreateArticle) {
    const response = await this.article.create(body);
    return response;
  }

  async getAllArticles() {
    return await this.article.find();
  }
  async getArticleById(id: string) {
    return await this.article.findById(id);
  }

  async updateArticle(id: string, body: ICreateArticle) {
    return await this.article.findByIdAndUpdate(id, body);
  }

  async deleteArticle(id: string) {
    return await this.article.findByIdAndDelete(id);
  }
}
const articleService = new ArticleService();
export default articleService;
