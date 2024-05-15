import mongoose, { CallbackError, Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
  registration_date: Date;
}

const userSchema = new Schema<UserDocument>({
  username: String,
  email: String,
  password: String,
  registration_date: { type: Date, default: Date.now() },
});

userSchema.pre<UserDocument>("save", async function (next) {
  try {
    if (!this?.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this?.password, salt);
    this.password = hashed;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
