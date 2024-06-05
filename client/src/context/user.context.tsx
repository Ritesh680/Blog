import { QueryKeys } from "@/constants/QueryKeys";
import authService from "@/service/auth.service";
import React, { PropsWithChildren, createContext, useState } from "react";
import { QueryObserverResult, RefetchOptions, useQuery } from "react-query";

interface UserContextProps {
	authenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	userProfile: UserProfile | undefined;
	setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
	fetchProfile: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IUser[], unknown>>;
}

export const UserContext = createContext<UserContextProps>({
	authenticated: false,
	setIsAuthenticated: () => {},
	userProfile: undefined,
	setUserProfile: () => {},
	fetchProfile: () =>
		Promise.resolve({} as QueryObserverResult<IUser[], unknown>),
});

export const UserProvider = ({ children }: PropsWithChildren) => {
	const [userProfile, setUserProfile] = useState<UserProfile>();
	const [authenticated, setIsAuthenticated] = useState(
		localStorage.getItem("token") ? true : false
	);

	const { refetch: fetchProfile } = useQuery({
		queryKey: [QueryKeys.Users],
		queryFn: () => authService.getProfileData(),
		enabled: authenticated,
		onSuccess: (data) => {
			setUserProfile(data[0]);
		},
	});

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
