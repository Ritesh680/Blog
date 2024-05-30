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
