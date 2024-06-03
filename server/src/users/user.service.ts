import mongoose from "mongoose";
import User from "../auth/auth.model";

class UserService {
	user = User;

	getUsers() {
		return this.user.find();
	}

	async getUserDetails(id: string) {
		const result = await this.user.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},

			{
				$lookup: {
					from: "articles",
					localField: "_id",
					foreignField: "authorId",
					as: "articles",
					pipeline: [
						{
							$project: {
								title: 1,
								content: 1,
								publicationDate: {
									$dateToString: {
										format: "%Y-%m-%d",
										date: "$publicationDate",
									},
								},
							},
						},
					],
				},
			},
			{
				$project: {
					username: 1,
					email: 1,
					registration_date: {
						$dateToString: { format: "%Y-%m-%d", date: "$registration_date" },
					},
					articles: 1,
					followers: 1,
					following: 1,
					imagePath: 1,
					description: 1,
				},
			},
		]);
		return result[0];
	}

	async followUser(currentUserId: string, followUserId: string) {
		const res = await this.user.findByIdAndUpdate(
			followUserId,
			{ $push: { followers: currentUserId } },
			{ new: true }
		);
		return res;
	}

	async unfollowUser(currentUserId: string, followUserId: string) {
		const res = await this.user.findByIdAndUpdate(
			followUserId,
			{ $pull: { followers: currentUserId } },
			{ new: true }
		);
		return res;
	}

	async getUserFollowers(userId: string) {
		const followers = await this.user.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(userId) } },
			{
				$lookup: {
					from: "users",
					localField: "followers",
					foreignField: "_id",
					as: "followers",
					pipeline: [
						{
							$project: {
								username: 1,
								email: 1,
							},
						},
					],
				},
			},
		]);
		return followers.map((user) => user.followers).flat();
	}
	async getUserFollowing(userId: string) {
		const following = await this.user.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(userId) } },
			{
				$lookup: {
					from: "users",
					localField: "following",
					foreignField: "_id",
					as: "following",
					pipeline: [
						{
							$project: {
								username: 1,
								email: 1,
							},
						},
					],
				},
			},
		]);
		return following.map((user) => user.following).flat();
	}

	async updateUser(userId: string, data: Record<string, string>) {
		const updatedUser = await this.user.findByIdAndUpdate(userId, data, {
			new: true,
		});
		return updatedUser;
	}
}

const userService = new UserService();
export default userService;
