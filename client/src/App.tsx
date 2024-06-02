import Layout from "./components/Layout";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage";
import CheckAuthAndRender from "./components/CheckAuthAndRender";
import BlogDetailPage from "./pages/BlogDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import Register from "./pages/Register";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Navigate to="/dashboard" />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route path="dashboard" element={<HomePage />}>
						<Route path="" element={<CheckAuthAndRender />} />,
					</Route>
					<Route path="/blogs/:blogId" element={<BlogDetailPage />} />
					<Route path="/users/:userId" element={<UserProfilePage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
