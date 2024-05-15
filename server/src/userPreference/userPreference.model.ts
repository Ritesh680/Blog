import mongoose from "mongoose";

const UserPreferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  preferenceType: String,
  preferenceValue: String,
});
const UserPreferences = mongoose.model("UserPreferences", UserPreferenceSchema);
export default UserPreferences;
