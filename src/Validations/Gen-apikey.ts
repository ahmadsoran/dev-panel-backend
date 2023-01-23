import Joi from "joi";
import { PlatformApiKey } from "../@types/Platform-apikey";

const GenApikeyValidation = Joi.object<PlatformApiKey>({
  Platform: Joi.string().id().required(),
});

export default GenApikeyValidation;
