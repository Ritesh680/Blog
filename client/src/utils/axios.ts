import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { createError } from "./function";
const instance = axios.create({
	baseURL: "http://localhost:4000",
	timeout: 1000,
	headers: {
		"Content-Type": "application/json",
	},
});
const token = localStorage.getItem("token");

instance.interceptors.request.use((config) => {
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

const getApiConfig = async (config?: AxiosRequestConfig) => {
	return {
		...config,
		headers: { Authorization: `Bearer ${token}` },
	};
};

async function axiosInstance<T>(
	method: Method,
	url: string,
	data?: unknown,
	config?: AxiosRequestConfig
): Promise<T | Error> {
	const apiConfig = await getApiConfig(config);
	let res;
	try {
		res = await instance.request({
			method,
			url,
			data,
			...apiConfig,
		});
		return res?.data;
	} catch (error) {
		let errorMessage = "Something went wrong";
		if (error instanceof AxiosError) {
			errorMessage =
				error.response?.data.message || error.message || "Something went wrong";
			createError(errorMessage);
		}
		throw new Error(errorMessage);
	}
}

export default axiosInstance;
