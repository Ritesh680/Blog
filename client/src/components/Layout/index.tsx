import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../Navbar";
import { UserProvider } from "@/context/user.context";

const Layout = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				retry: 1,
				refetchOnMount: true,
			},
		},
	});
	return (
		<UserProvider>
			<QueryClientProvider client={queryClient}>
				<div className="scroll-smooth">
					<div className="main">
						<div className="gradient"></div>
					</div>
					<div>
						<Navbar />
						<Outlet />
					</div>
				</div>
			</QueryClientProvider>
		</UserProvider>
	);
};

export default Layout;
