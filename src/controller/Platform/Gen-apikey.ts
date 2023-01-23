import { Request, Response } from "express";
import winston from "winston";
import AdminAccountSchema from "../../db/model/Dev-PanelSchema/AdminAccountSchema";
import PlatformsApiKeySchema from "../../db/model/PlatformSchema/Apikey";
import GenApikeyValidation from "../../Validations/Gen-apikey";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
export default async function GenApiKeyForPlatforms(
  req: Request,
  res: Response
) {
  const { platformID, AdminPassword } = req.body;
  try {
    try {
      await GenApikeyValidation.validateAsync({ Platform: platformID });
    } catch (error) {
      if (error instanceof Error) return res.status(400).send(error.message);
    }
    const PlatformData = await PlatformsApiKeySchema.findOne({
      platform: platformID,
    });
    if (!PlatformData) {
      await new PlatformsApiKeySchema({
        Platform: platformID,
        ApiKey: randomUUID(),
      }).save();
      return res.json({ patform: "platform api key created successfuly" });
    } else {
      if (!AdminPassword && PlatformData?.ApiKey) {
        return res.status(400).json({
          status: "confirm update api key with password",
          code: 41,
          platform:
            "this platform already has api key if you change it may break platform functionalty are you sure to too do this action",
        });
      }
      if (!AdminPassword && !PlatformData?.ApiKey) {
        PlatformData!.ApiKey = randomUUID();
        PlatformData!.save();
        return res.json({
          data: `Platform with id: ${platformID} api key has been added successfuly`,
        });
      }
      if (AdminPassword && PlatformData?.ApiKey) {
        const AdminUser = await AdminAccountSchema.findById(req.AdminID)
          .lean()
          .exec();
        if (!AdminUser) return res.status(404).send("user not found!");
        const comparePasswordWithHash = bcrypt.compare(
          AdminPassword,
          AdminUser?.password
        );
        if (!comparePasswordWithHash) {
          return res.status(400).send("invaild password");
        }

        PlatformData!.ApiKey = randomUUID();
        PlatformData!.save();
        return res.json({
          data: `Platform with id: ${platformID} api key has been updated successfuly`,
        });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      winston.error(
        `error while genarate api key for platform msg: ${error.message}`
      );
      return res.status(500).send("unkown error happend");
    }
  }
}
