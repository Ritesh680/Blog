import Category from "./category.model";

class CategoryService {
  category = Category;

  async createCategory(name: string) {
    const alreadyExists = await this.findCategoryByName(name);

    if (alreadyExists) {
      return;
    }

    const res = await this.category.create({ name });

    return res;
  }

  async findCategoryByName(name: string) {
    const category = this.category.findOne({ name });
    return category;
  }
  async findCategoryById(id: string) {
    const category = this.category.findById({ _id: id });
    return category;
  }
  async findCategoryByIdAndUpdate(id: string, name: string) {
    const category = this.category.findByIdAndUpdate(id, { name });
    console.log({ category });
    return category;
  }

  async getAllCategories() {
    return await this.category.find();
  }
}

export const categoryService = new CategoryService();
