import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AlertCircle from "@ant-design/icons";
import Loader2 from "@ant-design/icons";
import { useMutation } from "react-query";

import { Label } from "@/components/Label";
import { Button } from "@/components/Button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/Card";
import { Input } from "@/components/Input";
import authService from "@/service/auth.service";
import { useContext, useState } from "react";
import { UserContext } from "@/context/user.context";

interface Login {
	email: string;
	password: string;
}

const Login = () => {
	const [apiError, setApiError] = useState<string>();
	const navigate = useNavigate();
	const { setIsAuthenticated, fetchProfile } = useContext(UserContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>();

	const { mutate, isLoading } = useMutation({
		mutationFn: (data: Login) => authService.login(data),
		onSuccess: async (res) => {
			localStorage.setItem("token", res.data.data.token);
			setIsAuthenticated(true);

			await fetchProfile();
			navigate("/dashboard");
		},
		onError: (error: { message: string }) => {
			setApiError(error.message);
		},
	});

	const onSubmit = (data: Login) => {
		mutate(data);
	};
	return (
		<div>
			<div className="flex flex-col items-center justify-center w-screen h-[100vh] top-0 absolute transition-all duration-200">
				<p className="text-3xl font-medium text-center md:text-5xl">
					Welcome Back
				</p>

				<Card className="w-[400px] m-5 bg-black/10 backdrop-blur">
					<CardHeader>
						<CardTitle>Log In</CardTitle>
					</CardHeader>
					<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
						<CardContent>
							<div className="grid items-center w-full gap-4">
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
										<li>{errors.password.message}</li>
									</div>
								) : (
									<></>
								)}

								{apiError && (
									<div className="flex  gap-4 text-red-600 space-y-1.5 items-end">
										<AlertCircle />
										<span className="underline">{apiError}</span>
									</div>
								)}
							</div>
						</CardContent>

						<CardFooter className="flex flex-col items-start gap-4">
							<div>
								<Button type="submit" disabled={false} variant="destructive">
									{isLoading && (
										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									)}
									Sign in
								</Button>
							</div>

							<div>
								<span>No account?</span>

								<Link to="/register">
									<Button
										variant="link"
										className="text-xl text-green-600"
										disabled={false}>
										Sign up
									</Button>
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default Login;
