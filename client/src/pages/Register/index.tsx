import { Button } from "@/components/Button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/Card";
import InfiniteProgressBar from "@/components/InfiniteProgressBar";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import authService from "@/service/auth.service";
import { AlertOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface IRegister {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register = () => {
	const [error, setError] = useState<string>();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegister>();
	const navigate = useNavigate();

	// register mutation function
	const { mutate, isLoading: isPending } = useMutation({
		mutationFn: (data: IRegister) => authService.register(data),
		onSuccess: () => {
			navigate("/login");
		},
		onError: (error: { message: string }) => {
			setError(error.message);
		},
	});
	// handle form submission
	const onSubmit = (data: IRegister) => {
		mutate(data);
	};

	return (
		<>
			{isPending && <InfiniteProgressBar />}
			<div className="flex flex-col items-center justify-center w-screen h-[100vh] top-0 absolute transition-all duration-200">
				<p className="text-3xl font-medium text-center md:text-5xl">
					Join Ritesh
				</p>
				<Card className="w-[400px] m-5 bg-black/10 backdrop-blur">
					<CardHeader>
						<CardTitle>Register</CardTitle>
					</CardHeader>
					<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
						<CardContent>
							<div className="grid items-center w-full gap-4">
								{/* name */}
								<div className="flex flex-col space-y-1.5">
									<Label>Name</Label>
									<Input
										id="name"
										placeholder="Enter your name"
										{...register("username", { required: "Name is required" })}
									/>
								</div>
								{errors.username ? (
									<li className="text-sm text-red-600 list-none">
										{errors.username.message}
									</li>
								) : (
									<></>
								)}

								{/* email */}
								<div className="flex flex-col space-y-1.5">
									<Label>Email</Label>
									<Input
										id="email"
										placeholder="Enter your email"
										{...register("email", { required: "Email is required" })}
									/>
								</div>
								{errors.email ? (
									<li className="text-sm text-red-600 list-none">
										{errors.email.message}
									</li>
								) : (
									<></>
								)}

								{/* password */}
								<div className="flex flex-col space-y-1.5">
									<Label>Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="Enter your password"
										{...register("password", {
											required: "Password is required",
										})}
									/>
								</div>

								{errors.password ? (
									<div className="text-sm text-red-600 list-none">
										{errors.password.message}
									</div>
								) : (
									<></>
								)}

								{/* repassword */}
								<div className="flex flex-col space-y-1.5">
									<Label>Re-password</Label>
									<Input
										id="repassword"
										type="password"
										placeholder="Re-enter your password"
										{...register("confirmPassword", {
											required: "Confirm Password is required",
										})}
									/>
								</div>
								{errors.confirmPassword ? (
									<li className="text-sm text-red-600 list-none">
										{errors.confirmPassword.message}
									</li>
								) : (
									<></>
								)}

								{error && (
									<div className="flex  gap-4 text-red-600 space-y-1.5 items-end">
										<AlertOutlined />
										<span className="underline">{error}</span>
									</div>
								)}
							</div>
						</CardContent>

						<CardFooter className="flex flex-col items-start gap-4">
							<div>
								<Button type="submit" disabled={isPending}>
									Sign up
								</Button>
							</div>

							<div>
								<span>Already have an account?</span>
								<Link to="/login">
									<Button
										variant="link"
										className="text-xl text-green-600"
										disabled={isPending}>
										Sign in
									</Button>
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
				<div className="mx-5 text-center text-muted-foreground">
					Click “Sign up” to agree to Ritesh's Terms of Service and acknowledge
					that Ritesh’s Privacy Policy applies to you.
				</div>
			</div>
		</>
	);
};

export default Register;
