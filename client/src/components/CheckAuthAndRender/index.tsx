import PublicHome from "@/pages/HomePage/PublicPage";

const CheckAuthAndRender = () => {
	const isAuthenticated = !!localStorage.getItem("token");
	return isAuthenticated ? <PublicHome /> : <PublicHome />;
};

export default CheckAuthAndRender;
