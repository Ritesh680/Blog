import axiosInstance from "@/utils/axios";

interface IR {
	data: { token: string };
}

class AuthService {
	async login(data: {
		email: string;
		password: string;
	}): Promise<ApiResponse<IR>> {
		const response = await axiosInstance<ApiResponse<IR>>(
			"post",
			"/auth/login",
			data
		);
		if (response instanceof Error) {
			throw Error("Something went wrong");
		}
		return response;
	}

	async register(data: { email: string; password: string }) {
		const response = await axiosInstance("post", "/auth/register", data);
		return response;
	}

	async getProfileData() {
		const response = await axiosInstance<ApiResponse<IUser[]>>(
			"get",
			"/auth/me"
		);
		if (response instanceof Error) {
			throw Error("Something went wrong");
		}
		return response.data;
	}
}

const authService = new AuthService();
export default authService;
