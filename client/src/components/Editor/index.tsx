import { useRef } from "react";
import {
	FieldValues,
	UseControllerProps,
	useController,
} from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { userSlice } from "@/store/userSlice";

interface Quill<T extends FieldValues> extends UseControllerProps<T> {}

const Editor = <T extends FieldValues>({
	name,
	control,
	rules,
	defaultValue,
}: Quill<T>) => {
	const { field } = useController({ name, control, rules, defaultValue });
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			["bold", "italic", "underline", "strike", "blockquote", "code-block"],
			[{ font: [] }],
			[{ list: "ordered" }, { list: "bullet" }],
			["link"],
			["clean"],
		],
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"link",
		"background",
		"size",
		"font",
		"code-block",
	];

	const quillRef = useRef<ReactQuill>(null);

	return (
		<ReactQuill
			{...field}
			theme="snow"
			modules={modules}
			formats={formats}
			ref={quillRef}
			className=" size-full"
		/>
	);
};

export default Editor;
