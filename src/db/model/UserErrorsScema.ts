import { model, Schema } from "mongoose";
import { UserErrors } from "../../@types/User";

const UserErrors = new Schema<UserErrors>(
  {
    cause: String,
    informedBy: {
      type: Schema.Types.ObjectId,
      ref: "admin-account",
    },
    priority: {
      type: String,
      default: "normal",
    },
    status: String,
    times: Number,
  },
  { timestamps: true }
);

const ErrorsSchema = model("user-errors", UserErrors);

export default ErrorsSchema;
