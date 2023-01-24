import Joi from "joi";
import { AddErrorsData } from "../@types/FormData";
import { UserErrors } from "../@types/User";

const AddErrorsValidation = Joi.object<AddErrorsData>({
  cause: Joi.string().required(),
  priority: Joi.string()
    .valid("normal", "urgent", "critical" as UserErrors["priority"])
    .required(),
  status: Joi.string()
    .valid("crashed", "others" as UserErrors["status"])
    .required(),
  DeviceUUID: Joi.string().uuid().required(),
});

export default AddErrorsValidation;
