import { model, Schema } from "mongoose";
import { UserDivice } from "../../@types/User";

const UserDivice = new Schema<UserDivice>(
  {
    brand: String,
    CPU: String,
    GPU: String,
    model: String,
    RAM: String,
    software_restrictions: {
      type: String,
      default: "lock",
      enum: ["lock", "unloack"],
    },
    UUID: String,
  },
  { timestamps: true }
);

const UserDeviceSchema = model("user-device", UserDivice);

export default UserDeviceSchema;
