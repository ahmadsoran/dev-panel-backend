import { model, Schema } from "mongoose";
import { User } from "../../@types/User";

const Users = new Schema<User>(
  {
    name: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "dev", "tester"],
    },
    Device: {
      type: Schema.Types.ObjectId,
      ref: "user-device",
    },
    Errors: {
      types: [Schema.Types.ObjectId],
      ref: "user-errors",
    },
  },
  { timestamps: true }
);

const UsersSchema = model("users", Users);

export default UsersSchema;
