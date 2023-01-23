import { Request, Response } from "express";
import winston from "winston";
import { PlatformOwner } from "../../@types/Platform";
import PlatformSchema from "../../db/model/PlatformSchema/Platform";
import AddPlatformValidations from "../../Validations/Add-PlatformValidations";

export default async function AddPlatform(req: Request, res: Response) {
  const {
    name,
    ownerName,
    ownerEmail,
    ownerPhone,
    releaseVersion,
    platformType,
  } = req.body;

  const owner: PlatformOwner = {
    name: ownerName,
    email: ownerEmail,
    phone_number: ownerPhone,
  };
  try {
    try {
      await AddPlatformValidations.validateAsync({
        name,
        owner,
        releaseVersion,
        platformType,
      });
    } catch (error) {
      if (error instanceof Error) return res.status(400).send(error.message);
    }
    const addPlatform = await new PlatformSchema({
      name,
      owner,
      releaseVersion,
      platformType,
    }).save();

    if (addPlatform)
      return res.json({
        platform: `Platform ${name} added successfully`,
      });
  } catch (error) {
    if (error instanceof Error) {
      const isDuplicateErr = error.message.includes("duplicate");
      winston.error(`error while adding Platform msg: ${error.message}`);
      return res
        .status(isDuplicateErr ? 400 : 500)
        .send(isDuplicateErr ? "This Platform exist" : "unkown error happen");
    }
  }
}
