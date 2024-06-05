import axiosInstance from "@/utils/axios";

class TagService {
	async getAllTags(): Promise<ApiResponse<TagList[]>> {
		const res = await axiosInstance<ApiResponse<TagList[]>>("get", "/tags");
		if (res instanceof Error) throw new Error("Error fetching tags");
		return res;
	}

	async getTagById(id: string) {
		const res = await axiosInstance<ApiResponse<ITagsWithArticles>>(
			"get",
			`/tags/${id}`
		);
		if (res instanceof Error) throw new Error("Error fetching tag");
		return res;
	}

	async createTag(value: string) {
		const res = await axiosInstance<ApiResponse<TagList>>("post", "/tags", {
			name: value,
		});
		if (res instanceof Error) throw new Error("Error creating tag");
		return res.data;
	}

	async addFollower(tagId: string) {
		const res = await axiosInstance("post", `/tags/${tagId}/follower`);
		if (res instanceof Error) throw new Error("Error following tag");
		return res;
	}
	async removeFollower(tagId: string) {
		const res = await axiosInstance("delete", `/tags/${tagId}/follower`);
		if (res instanceof Error) throw new Error("Error following tag");
		return res;
	}
}

const tagService = new TagService();
export default tagService;
