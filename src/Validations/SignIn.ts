import Joi from "joi";
import { SiginInData } from "../@types/FormData";

const SignInDataValidation = Joi.object<SiginInData>({
  username: Joi.string().min(4).max(15).alphanum().required(),
  password: Joi.string().min(6).required(),
});

export default SignInDataValidation;
