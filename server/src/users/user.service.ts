import mongoose from "mongoose";
import User from "../auth/auth.model";

class UserService{
  user = User;

    getUsers(){
        return this.user.find();
    }
  
  async getUserDetails(id: string) {
    const result =  await this.user.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id)} },
      {
        $lookup: {
          from: "articles",
          localField: "_id",
          foreignField: "authorId",
          as: "articles",
          pipeline: [
            { $project: { title: 1, content: 1, publicationDate: { $dateToString: { format: "%Y-%m-%d", date: "$publicationDate" } } }}
          ]
        }
      },
      {
        $project: {
          username: 1,
          email: 1,
          registration_date: { $dateToString: { format: "%Y-%m-%d", date: "$registration_date" } },
          articles:1
      }}
    ]);
    return result
  }
}

const userService = new UserService();
export default userService;
