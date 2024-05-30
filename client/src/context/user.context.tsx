import authService from "@/service/auth.service";
import React, {
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from "react";

interface UserContextProps {
	authenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	userProfile: Record<string, string>;
	setUserProfile: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextProps>({
	authenticated: false,
	setIsAuthenticated: () => {},
	userProfile: {},
	setUserProfile: () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [userProfile, setUserProfile] = useState({});
	const [authenticated, setIsAuthenticated] = useState(
		localStorage.getItem("token") ? true : false
	);

	async function fetchProfile() {
		const profile = await authService.getProfileData();

		setUserProfile(profile);
	}

	useEffect(() => {
		if (authenticated) {
			fetchProfile();
		}
	}, [authenticated]);

	return (
		<UserContext.Provider
			value={{
				authenticated,
				setIsAuthenticated,
				userProfile,
				setUserProfile,
			}}>
			{children}
		</UserContext.Provider>
	);
};
