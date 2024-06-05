import mongoose from "mongoose";
import Tag from "./tags.model";

class TagService {
	tag = Tag;
	async createTag(name: string) {
		return this.tag.create({ name });
	}

	async getAllTags() {
		return this.tag.find();
	}

	async findTagByName(name: string) {
		return this.tag.findOne({ name });
	}
	async findTagById(id: string) {
		const res = await this.tag.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(id) } },
			{
				$lookup: {
					from: "articles",
					localField: "_id",
					foreignField: "tag",
					as: "articles",
					pipeline: [
						{
							$lookup: {
								from: "users",
								localField: "authorId",
								foreignField: "_id",
								as: "user",
							},
						},
						{
							$lookup: {
								from: "tags",
								localField: "tag",
								foreignField: "_id",
								as: "tag",
							},
						},
						{ $unwind: "$tag" },
					],
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "followers",
					foreignField: "_id",
					as: "followers",
				},
			},
		]);

		return res[0];
	}

	async addFollower(tagId: string, userId: string) {
		const res = await this.tag.findByIdAndUpdate(
			tagId,
			{
				$addToSet: { followers: new mongoose.Types.ObjectId(userId) },
			},
			{ new: true }
		);

		return res;
	}

	async removeFollower(tagId: string, userId: string) {
		console.log({ tagId });
		return this.tag.findByIdAndUpdate(tagId, {
			$pull: { followers: new mongoose.Types.ObjectId(userId) },
		});
	}
}
const tagService = new TagService();
export default tagService;