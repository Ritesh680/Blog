import mongoose from "mongoose";

const AdvertisementSchema = new mongoose.Schema({
  adTitle: {
    type: String,
    required: true,
  },
  adContent: {
    type: String,
    required: true,
  },
  advertiserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  adType: {
    type: String,
    required: true,
  },
  adPlacement: {
    type: String,
    required: true,
  },
  adStartDate: {
    type: Date,
    required: true,
  },
  adEndDate: {
    type: Date,
    required: true,
  },
});

const Advertisement = mongoose.model("Advertisement", AdvertisementSchema);
export default Advertisement;
