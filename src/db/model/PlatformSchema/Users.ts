import { model, Schema } from "mongoose";
import { platformUsers } from "../../../@types/User";

const Users = new Schema<platformUsers>(
  {
    platformID: Schema.Types.ObjectId,
    users: [
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
          UUID: {
            type: String,
          },
        },
        Errors: [
          {
            type: Schema.Types.ObjectId,
            ref: "user-errors",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const UsersSchema = model("users", Users);

export default UsersSchema;
