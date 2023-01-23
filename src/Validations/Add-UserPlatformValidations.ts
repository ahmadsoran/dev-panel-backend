import Joi from "joi";
import { User, UserDivice } from "../@types/User";

const AddPlatformValidations = Joi.object<User>({
  Device: Joi.object<UserDivice>({
    brand: Joi.string().required(),
    CPU: Joi.string().required(),
    GPU: Joi.string().required(),
    model: Joi.string().required(),
    RAM: Joi.string().required(),
    software_restrictions: Joi.string()
      .valid("loack", "unlock")
      .default("lock")
      .required(),
    UUID: Joi.string().uuid().required(),
  }).required(),
  name: Joi.string().required(),
  role: Joi.string()
    .valid("user", "dev", "tester" as User["role"])
    .required(),
});

export default AddPlatformValidations;
