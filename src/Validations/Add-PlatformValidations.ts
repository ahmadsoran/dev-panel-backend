import Joi from "joi";
import PlatformsType, { PlatformOwner } from "../@types/Platform";

const AddPlatformValidations = Joi.object<PlatformsType>({
  name: Joi.string().min(3).max(100).required(),
  owner: Joi.object<PlatformOwner>({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().min(7),
  }).required(),
  platformType: Joi.string()
    .valid("android", "ios", "Both" as PlatformsType["platformType"])
    .required(),
  releaseVersion: Joi.string().required(),
});

export default AddPlatformValidations;
