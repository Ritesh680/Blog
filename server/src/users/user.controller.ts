import { Request, Response } from "express";
import userService from "./user.service";
import ApiResponse from "../middleware/response";
import { decodeToken } from "../utils/functions";

class UserController{
  async getAllUsers(req:Request, res:Response){
    const data = await userService.getUsers();
    new ApiResponse(res).success(data,"Users fetched successfully");
  }
  async getUserDetails(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1]!;
    const userId = (await decodeToken(token)).userId;
    const data = await userService.getUserDetails(userId);
    new ApiResponse(res).success(data,"User details fetched successfully");
  }
}

const userController = new UserController();
export default userController;