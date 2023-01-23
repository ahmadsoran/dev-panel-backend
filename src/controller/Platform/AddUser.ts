import { Request, Response } from "express";
import winston from "winston";
// import PlatformSchema from "../../db/model/PlatformSchema/Platform";
import UsersSchema from "../../db/model/PlatformSchema/Users";
import AddUserPlatformValidations from "../../Validations/Add-UserPlatformValidations";

export default async function AddUser(req: Request, res: Response) {
  const { Device } = req.body;
  const platformID = req.platformID;
  try {
    try {
      await AddUserPlatformValidations.validateAsync({ Device });
    } catch (error) {
      if (error instanceof Error) return res.status(400).send(error.message);
    }

    const User = await UsersSchema.findOne({ platformID });
    if (!User) {
      await new UsersSchema({
        platformID,
        users: { Device: Device },
      }).save();
      return res.json({ platform: "Platform user created successfully" });
    }
    const CheckForOldReg = await UsersSchema.findOne({ platformID })
      .where("users.Device.UUID")
      .equals(Device.UUID)
      .lean()
      .exec();
    console.log(CheckForOldReg);
    if (!CheckForOldReg) {
      await UsersSchema.findOneAndUpdate(
        { platformID },
        {
          $push: {
            users: { Device },
          },
        }
      );
      return res.json({
        platform: `Device ${Device.brand} added successfully`,
      });
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
