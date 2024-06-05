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
		tagsFollowing: string[];
		email: string;
	}

	interface IArticle {
		_id: string;
		title: string;
		content: string;
		description: string;
		authorId: string;
		user: IUser[];
		categoryId: string;
		likes: string[];
		comments: string[];
		publicationDate: string;
		picture: File;
		updatedAt: string;
		tag: ITags;
		filesPath: string[];
	}

	interface ICreateArticle {
		title: string;
		description: string;
		content: string;
		files: File;
		categoryId: string;
	}
	interface ICreateArticleResponse extends ICreateArticle {
		_id: string;
	}
	interface ITags {
		name: string;
		_id: string;
		followers: IUser[];
	}

	interface ITagsWithArticles extends ITags {
		articles: IArticle[];
		tagsFollowing: string[];
	}

	interface UserProfile {
		_id: string;
		username: string;
		description: string;
		about: string;
		followers: IUser[];
		following: IUser[];
		articles: IArticle[];
		imagePath?: string[];
		email: string;
		tagsFollowing: string[];
	}

	interface ICreateComment {
		comment: string;
		articleId: string;
	}

	interface IComment {
		_id: string;
		user: IUser;
		articleId: string;
		commentDate: Date;
		comment: string;
	}
}
