import { Request, Response } from "express";
import User, { UserDocument } from "./auth.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Config from "../config/config";

class AuthService {
  constructor(private config = Config(process.env.NODE_ENV)) {}
  user = User;

  async registerUser(body: UserDocument) {
    const data = await this.user.create(body);
    return data;
  }

  async loginUser(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) return;
    const isAuth = await this.comparePassword(password, user?.password);
    if (isAuth) {
      const token = this.generateToken({ email, userId: user._id });
      return token;
    }
  }

  async findOneByEmail(email: string) {
    const res = await this.user.findOne({ email });
    return res;
  }

  async comparePassword(
    plainPassword: string,
    hasedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hasedPassword);
  }

  async generateToken(data: any) {
    const token = jwt.sign(data, this.config.jwtToken);
    return token;
  }
}
const authService = new AuthService();
export default authService;
