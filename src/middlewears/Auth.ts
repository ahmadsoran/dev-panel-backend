import { NextFunction, Request, Response } from "express";
import winston from "winston";
import jwt from "jsonwebtoken";
import AdminAccountSchema from "../db/model/AdminAccountSchema";
import PlatformsApiKeySchema from "../db/model/PlatformApikeySchema";
type decodedToken = {
  _id: string;
};
export async function isAdmin(req: Request, res: Response, Next: NextFunction) {
  const token: string = req.cookies?.token || "";
  const privateKey = process.env.PRV_TOKEN;
  try {
    if (!privateKey) {
      winston.error("private key is undifined");
      return res.status(500).send("unkown error happen try again later");
    }

    const VerifiedToken: decodedToken = jwt.verify(
      token,
      privateKey
    ) as decodedToken;

    const isAdminUser = await AdminAccountSchema.findById(VerifiedToken?._id);

    if (!VerifiedToken?._id)
      return res.status(401).send("you are not authorized to do this action");
    if (isAdminUser?.role === "admin" || isAdminUser?.role === "superadmin")
      return Next();
    return res.status(401).send("you are not authorized to do this action");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send("unkown error happen please try again later");
    }
  }
}
////
export async function isSuperAdmin(
  req: Request,
  res: Response,
  Next: NextFunction
) {
  const token: string = req.cookies?.token || "";
  const privateKey = process.env.PRV_TOKEN;
  try {
    if (!privateKey) {
      winston.error("private key is undifined");
      return res.status(500).send("unkown error happen try again later");
    }

    const VerifiedToken: decodedToken = jwt.verify(
      token,
      privateKey
    ) as decodedToken;

    const isAdminUser = await AdminAccountSchema.findById(VerifiedToken?._id);

    if (!VerifiedToken?._id)
      return res.status(401).send("you are not authorized to do this action");
    if (isAdminUser?.role === "superadmin") return Next();
    return res.status(401).send("you are not authorized to do this action");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send("unkown error happen please try again later");
    }
  }
}
/////

type decodeApikey = {
  apiKey: string;
};
export async function isApiKeyValid(
  req: Request,
  res: Response,
  Next: NextFunction
) {
  const ApiKey = req.headers.authorization;
  const privateKey = process.env.PRV_TOKEN;
  if (!ApiKey) return res.status(400).send("provide api key");
  if (!privateKey)
    return res.status(500).send("something went wrong! try again later");
  try {
    const decodeApiKey = jwt.verify(ApiKey, privateKey) as decodeApikey;
    const ValidateApiKey = await PlatformsApiKeySchema.findOne({
      ApiKey: decodeApiKey?.apiKey,
    });
    if (!ValidateApiKey)
      return res.status(401).send("unauthorized to do this action");
    Next();
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while api key validate msg:${error.message}`);
      return res.status(500).send("unkown error happen");
    }
  }
}
