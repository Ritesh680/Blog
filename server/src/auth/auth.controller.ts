import { Request, Response } from "express";
import authService from "./auth.service";
import ApiResponse from "../middleware/response";

class AuthController {
  register = async (req: Request, res: Response) => {
    const body = req.body;
    const data = await authService.registerUser(body);
    new ApiResponse(res).success(data, "registration Success", 201);
  };

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    if (token)
      return new ApiResponse(res).success(
        { data: { email, token } },
        "Logged in success",
        200,
      );
    new ApiResponse(res).failed("Invalid email or password");
  }
}

const authController = new AuthController();
export default authController;
