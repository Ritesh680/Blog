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
	fetchProfile: () => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
	authenticated: false,
	setIsAuthenticated: () => {},
	userProfile: {},
	setUserProfile: () => {},
	fetchProfile: async () => {},
});

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [userProfile, setUserProfile] = useState({});
	const [authenticated, setIsAuthenticated] = useState(
		localStorage.getItem("token") ? true : false
	);

	async function fetchProfile() {
		const profile = await authService.getProfileData();

		setUserProfile(profile[0]);
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
				fetchProfile,
			}}>
			{children}
		</UserContext.Provider>
	);
};
