import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
  subscriptionType: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
