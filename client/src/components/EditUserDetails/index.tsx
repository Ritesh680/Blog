import React, { useContext, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

import { QueryKeys } from "@/constants/QueryKeys";
import { UserContext } from "@/context/user.context";
import userService from "@/service/user.service";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../Dialog";
import { Label } from "../Label";
import { Input } from "../Input";
import { Button } from "../Button";
import InfiniteLoader from "../InfiniteLoader";

const EditUserDetails = () => {
	const queryClient = useQueryClient();
	const { userProfile, fetchProfile } = useContext(UserContext);
	const dialogCloseRef = useRef<HTMLButtonElement>(null);

	function closeDialog() {
		dialogCloseRef.current?.click();
	}

	const { register, handleSubmit, setValue } = useForm<IUser>();

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.files![0];

		if (value) {
			setValue("files", value);
		}

		// Validate file type for the 'picture' input
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (data: IUser) => userService.updateUser(userProfile._id, data),

		onSettled: () => {
			queryClient.refetchQueries({
				queryKey: [QueryKeys.Users, userProfile._id],
			});
		},
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: [QueryKeys.Users, userProfile._id],
			});
			queryClient.invalidateQueries(QueryKeys.Users);
			fetchProfile();
			closeDialog();
		},
	});

	const onSubmit = (data: IUser) => {
		mutate(data);
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="text-sm font-semibold text-green-600 cursor-pointer hover:underline">
					Edit profile
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						<span>
							Make changes to your profile here. Click save when you're done.
						</span>
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					{/* name */}
					<div className="grid items-center grid-cols-4 gap-4">
						<Label>Name</Label>
						<Input
							id="name"
							placeholder="name"
							className="col-span-3"
							{...register("username")}
						/>
					</div>

					{/* picture */}
					<div className="grid items-center grid-cols-4 gap-4">
						<Label>Profile</Label>
						<Input
							type="file"
							id="profilePicture"
							name="profilePicture"
							className="col-span-3"
							onChange={handleFileInput}
						/>
					</div>

					{/* about */}
					<div className="grid items-center grid-cols-4 gap-4">
						<Label>About</Label>
						<Input
							id="about"
							placeholder="a small brief about you"
							className="col-span-3"
							{...register("about")}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleSubmit(onSubmit)}>
						{isLoading == false ? <InfiniteLoader /> : "Save changes"}
					</Button>
				</DialogFooter>
				<DialogClose ref={dialogCloseRef} />
			</DialogContent>
		</Dialog>
	);
};

export default EditUserDetails;
