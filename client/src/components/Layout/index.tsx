import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { UserProvider } from "@/context/user.context";

const Layout = () => {
	return (
		<UserProvider>
			<div className="scroll-smooth">
				<div className="main">
					<div className="gradient"></div>
				</div>
				<div>
					<Navbar />
					<Outlet />
				</div>
			</div>
		</UserProvider>
	);
};

export default Layout;
