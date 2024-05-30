import authService from "@/service/auth.service";
import { useCallback, useEffect, useState } from "react";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [profile, setProfile] = useState<IUser>();

	const setAndReturnProfile = useCallback(async () => {
		if (!isAuthenticated) return;
		const res = await authService.getProfileData();
		if (res instanceof Error) throw new Error("Error fetching profile data");
		setProfile(res);
	}, [isAuthenticated]);

	function logout() {
		localStorage.removeItem("token");
		setIsAuthenticated(false);
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
			setAndReturnProfile();
		}
	}, [isAuthenticated, setAndReturnProfile]);

	return { isAuthenticated, logout, profile, setIsAuthenticated };
};
export default useAuth;
