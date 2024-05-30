import { Avatar } from "antd";
import { Link } from "react-router-dom";

const UserCard = ({ user }: { user: IUser }) => {
	return (
		<div className="flex items-center gap-5">
			<Avatar>{user?.username?.slice(0, 2)}</Avatar>

			<div className="flex flex-col flex-1">
				<Link to={`/users/${user._id}`} className="mb-1 text-sm font-semibold">
					{user.username}
				</Link>
				<div className="text-sm text-muted-foreground">{user?.description}</div>
			</div>
		</div>
	);
};

export default UserCard;
