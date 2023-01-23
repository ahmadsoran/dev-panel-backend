import Joi from "joi";
import { User, UserDivice } from "../@types/User";

const AddUserPlatformValidations = Joi.object<User>({
  Device: Joi.object<UserDivice>({
    brand: Joi.string().required(),
    CPU: Joi.string().required(),
    GPU: Joi.string().required(),
    model: Joi.string().required(),
    RAM: Joi.string().required(),
    software_restrictions: Joi.string()
      .valid("lock", "unloack" as UserDivice["software_restrictions"])
      .default("lock")
      .required(),
    UUID: Joi.string().uuid().required(),
  }).required(),
});

export default AddUserPlatformValidations;
