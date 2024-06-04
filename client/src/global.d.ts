export {};
declare global {
	interface ApiResponse<T> {
		success: boolean;
		data: T;
		message: string;
	}
	interface IUser {
		_id: string;
		username: string;
		description: string;
		about: string;
		followers: IUser[];
		following: IUser[];
		articles: IArticle[];
		imagePath?: string[];
		files?: File;
	}

	interface IArticle {
		_id: string;
		title: string;
		content: string;
		description: string;
		authorId: string;
		user: IUser[];
		categoryId: string;
		likes: { _id: string }[];
		comments: string[];
		publicationDate: string;
		picture: File;
		updatedAt: string;
		tag: string;
		filesPath: string[];
	}

	interface ICreateArticle {
		title: string;
		description: string;
		content: string;
		files: File;
		categoryId: string;
	}
}
