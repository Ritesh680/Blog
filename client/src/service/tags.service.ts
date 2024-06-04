import axiosInstance from "@/utils/axios";

export interface ITags {
	name: string;
}

class TagService {
	async getAllTags(): Promise<ApiResponse<ITags[]>> {
		const res = await axiosInstance<ApiResponse<ITags[]>>("get", "/categories");
		if (res instanceof Error) throw new Error("Error fetching tags");
		return res;
	}

	async createTag(value: string) {
		const res = await axiosInstance<ApiResponse<ITags>>("post", "/categories", {
			name: value,
		});
		if (res instanceof Error) throw new Error("Error creating tag");
		return res.data;
	}
}

const tagService = new TagService();
export default tagService;
