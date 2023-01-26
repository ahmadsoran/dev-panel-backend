import { model, Schema } from "mongoose";
import { User } from "../../../@types/User";

const Users = new Schema<User>(
  {
    role: {
      type: String,
      default: "user",
      enum: ["user", "dev", "tester"],
    },
    Device: {
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
      version: String,
    },
    Errors: [
      {
        type: Schema.Types.ObjectId,
        ref: "user-errors",
      },
    ],
    platform: {
      type: Schema.Types.ObjectId,
      ref: "platforms",
    },
  },
  { timestamps: true }
);

const UsersSchema = model("users", Users);

export default UsersSchema;
