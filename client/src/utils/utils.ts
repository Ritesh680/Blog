import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]): string {
	return twMerge(clsx(inputs));
}

// function to format date
export const formatDate = (inputDate: Date) => {
	const formattedDate = new Date(inputDate).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
	return formattedDate;
};
