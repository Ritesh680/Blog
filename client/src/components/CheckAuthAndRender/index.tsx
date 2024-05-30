import PublicHome from "@/pages/HomePage/PublicPage";

const CheckAuthAndRender = () => {
	const isAuthenticated = !!localStorage.getItem("token");
	return isAuthenticated ? <p>Not authenticated</p> : <PublicHome />;
};

export default CheckAuthAndRender;
