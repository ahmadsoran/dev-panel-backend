import { Request, Response } from "express";
import winston from "winston";
import ErrorsSchema from "../../db/model/PlatformSchema/UserErrors";
import UsersSchema from "../../db/model/PlatformSchema/Users";
import AddErrorsValidation from "../../Validations/AddErrorsValidations";

export default async function addUserErrors(req: Request, res: Response) {
  const { cause, priority, status, DeviceUUID } = req.body;
  try {
    try {
      await AddErrorsValidation.validateAsync({
        cause,
        priority,
        status,
        DeviceUUID,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send(error.message);
      }
    }
    const CreateError = await new ErrorsSchema({
      cause,
      priority,
      status,
    }).save();
    const User = await UsersSchema.findOneAndUpdate(
      { "Device.UUID": DeviceUUID },
      {
        $push: {
          Errors: CreateError._id,
        },
      }
    );
    if (!User) return res.status(404).send("no user found");
    return res.json({ user: "error added success" });
  } catch (error) {
    if (error instanceof Error) {
      winston.error(
        `error while adding user error to database msg:${error.message}`
      );
      return res.status(500).send("unkown error");
    }
  }
}
