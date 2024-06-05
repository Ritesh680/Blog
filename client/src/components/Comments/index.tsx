import { useContext } from "react";
import { UserContext } from "@/context/user.context";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../Sheet";
import CommentInput from "./CommentInput";
import { CommentOutlined } from "@ant-design/icons";
import CommentList from "./CommentsList";

const Comment = () => {
	const { authenticated: isAuthenticated } = useContext(UserContext);
	return (
		<Sheet>
			<SheetTrigger asChild>
				<div>
					<CommentOutlined className="w-5 h-5" />
				</div>
			</SheetTrigger>
			<SheetContent className="overflow-auto ">
				<SheetHeader>
					<SheetTitle>Comments</SheetTitle>
				</SheetHeader>
				{isAuthenticated && (
					<div className="mt-5 mr-5">
						<CommentInput />
					</div>
				)}

				<div className="mt-5 overflow-auto">
					{/* <CommentList /> */}
					<CommentList />
				</div>
				<SheetFooter></SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default Comment;
