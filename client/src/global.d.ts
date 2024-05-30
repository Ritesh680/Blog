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
		image?: File;
	}

	interface IArticle {
		_id: string;
		title: string;
		content: string;
		description: string;
		authorId: string;
		user: IUser;
		categoryId: string;
		likes: string[];
		comments: string[];
		publicationDate: string;
		picture: string;
		updatedAt: string;
		tag: { _id: string; name: string };
	}
}
