import { AlertFilled } from "@ant-design/icons";

const Error = ({ message }: { message: string }) => {
	return (
		<div className="flex  gap-4 text-red-600 space-y-1.5 items-end m-5">
			<AlertFilled />
			<span className="underline">{message}</span>
		</div>
	);
};

export default Error;
