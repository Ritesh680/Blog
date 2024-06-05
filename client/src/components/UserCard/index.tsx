import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";

const UserCard = ({ user }: { user: IUser }) => {
	return (
		<div className="flex items-center gap-5">
			<Avatar>
				<AvatarImage
					src={`${import.meta.env.VITE_API_URL}/${user.imagePath?.[0]}`}
				/>
				<AvatarFallback>{user?.username?.slice(0, 2)}</AvatarFallback>
			</Avatar>

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
