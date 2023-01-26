import { Request, Response } from "express";
import winston from "winston";
import UsersSchema from "../../db/model/PlatformSchema/Users";
import AddUserValidations from "../../Validations/Add-UserValidations";

export default async function AddUser(req: Request, res: Response) {
  const { Device } = req.body;
  const platformID = req.platformID;
  try {
    try {
      await AddUserValidations.validateAsync({ Device });
    } catch (error) {
      if (error instanceof Error) return res.status(400).send(error.message);
    }

    const User = UsersSchema.find({ platform: platformID });

    const checkForOldReg = await User.where("Device.UUID")
      .equals(Device.UUID)
      .lean()
      .exec();
    if (checkForOldReg.length === 0) {
      await new UsersSchema({
        Device,
        platform: platformID,
      }).save();
      return res.json({ platform: "Platform user created successfully" });
    } else {
      return res.status(400).send("device exist");
    }
  } catch (error) {
    if (error instanceof Error) {
      const isDuplicateErr = error.message.includes("duplicate");
      if (!isDuplicateErr) {
        winston.error(
          `error while adding user to platform msg: ${error.message}`
        );
      }
      return res
        .status(isDuplicateErr ? 400 : 500)
        .send(
          isDuplicateErr
            ? "this device already registerd"
            : "unkown error happend" + error.message
        );
    }
  }
}
