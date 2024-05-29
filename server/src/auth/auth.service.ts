import User, { UserDocument } from "./auth.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Config from "../config/config";

class AuthService {
  constructor(private config = Config(process.env.NODE_ENV)) {}
  user = User;

  async registerUser(body: UserDocument) {
    const data = await this.user.create(body)
    const userId = data._id;

    const user = await this.user.findOne({ _id: userId,
    }, { projection: { password: 0 } })
    return user;
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

  async getAllUsers() {
    const users = await this.user.find();
    return users;
  }

  async findOneByEmail(email: string) {
    const res = await this.user.findOne({ email });
    return res;
  }

  async logoutUser(token: string) {
    // Add the token to the blacklist
  }

  async getUserData(token: string) { 
    // Decode the token and return the user data
    const temp =await  this.user.aggregate([
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "userId",
          as: "articles",
        },
      },
    ])
    return temp;
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
