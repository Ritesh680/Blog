/* eslint-disable @typescript-eslint/no-explicit-any */
export function createError(message: string) {
	const div = document.createElement("div");
	div.className = "flex gap-4 text-red-600 space-y-1.5 items-end m-5";

	const alertIcon = document.createElement("span");
	alertIcon.className = "anticon anticon-alert-filled";
	div.appendChild(alertIcon);

	const messageSpan = document.createElement("span");
	messageSpan.className = "underline";
	messageSpan.textContent = message;
	div.appendChild(messageSpan);

	return div;
}

export const objectToFormData = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	obj: Record<string, any>,
	formData = new FormData(),
	parentKey = ""
): FormData => {
	for (const key in obj) {
		const propName = parentKey ? `${parentKey}[${key}]` : key;

		if (Array.isArray(obj[key])) {
			obj[key].forEach((item: any, index: number) => {
				const itemKey = `${propName}[${index}]`;
				if (typeof item === "object" && !(item instanceof File)) {
					objectToFormData(item, formData, itemKey);
				} else {
					if (item instanceof File) {
						formData.append(itemKey, item);
					} else {
						formData.append(itemKey, item);
					}
				}
			});
		} else if (typeof obj[key] === "object" && !(obj[key] instanceof File)) {
			objectToFormData(obj[key], formData, propName);
		} else {
			if (obj[key] instanceof File) {
				formData.append(propName, obj[key]);
			} else {
				formData.append(propName, obj[key]);
			}
		}
	}

	return formData;
};

export async function createFileFromUrl(url: string, filename: string) {
	return fetch(url)
		.then((res) => res.blob())
		.then((blob) => new File([blob], filename));
}
