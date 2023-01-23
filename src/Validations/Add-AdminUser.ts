import Joi from "joi";
import { AdminAccountDataType } from "../@types/Admin-account";

const AddAdminUserValidation = Joi.object<AdminAccountDataType>({
  username: Joi.string().min(4).max(15).alphanum().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(4).max(15).required(),
  role: Joi.string().valid("admin", "superadmin").required(),
});

export default AddAdminUserValidation;
