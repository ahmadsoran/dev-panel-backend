import { NextFunction, Request, Response } from "express";
import winston from "winston";
import jwt from "jsonwebtoken";
import AdminAccountSchema from "../db/model/Dev-PanelSchema/AdminAccountSchema";
import PlatformsApiKeySchema from "../db/model/PlatformSchema/Apikey";
type decodedToken = {
  id: string;
};
export async function isAdmin(req: Request, res: Response, Next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const privateKey = process.env.PRV_KEY;
  try {
    if (!privateKey) {
      winston.error("private key is undifined");
      return res.status(500).json({ error: "unkown error tryagain later" });
    }
    if (!token)
      return res
        .status(401)
        .json({ error: "you are not authorized to do this action" });
    const VerifiedToken: decodedToken = jwt.verify(
      token,
      privateKey
    ) as decodedToken;

    const AdminUser = await AdminAccountSchema.findById(VerifiedToken?.id);
    if (!VerifiedToken?.id)
      return res
        .status(401)
        .json({ error: "you are not authorized to do this action" });

    if (AdminUser?.role === "admin" || AdminUser?.role === "superadmin") {
      req.AdminID = AdminUser?._id;
      return Next();
    }
    return res
      .status(401)
      .json({ error: "you are not authorized to do this action" });
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while authenticate admin msg:${error.message}`);
      return res.status(500).json({ error: "unkown error tryagain later" });
    }
  }
}
////
export async function isSuperAdmin(
  req: Request,
  res: Response,
  Next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const privateKey = process.env.PRV_KEY;

  try {
    if (!privateKey) {
      winston.error("private key is undifined");
      return res.status(500).json({ error: "unkown error tryagain later" });
    }
    if (!token)
      return res
        .status(401)
        .json({ error: "you are not authorized to do this action" });

    const VerifiedToken: decodedToken = jwt.verify(
      token,
      privateKey
    ) as decodedToken;
    if (!VerifiedToken?.id)
      return res
        .status(401)
        .json({ error: "you are not authorized to do this action" });

    const AdminUser = await AdminAccountSchema.findById(VerifiedToken?.id);
    if (AdminUser?.role === "superadmin") {
      req.AdminID = AdminUser?._id;
      return Next();
    }
    return res
      .status(401)
      .json({ error: "you are not authorized to do this action" });
  } catch (error) {
    if (error instanceof Error) {
      winston.error(
        `error while authenticate super admin msg:${error.message}`
      );
      return res.status(500).json({ error: "unkown error tryagain later" });
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
  const ApiKey = req.headers.apikey as string;
  const privateKey = process.env.PRV_KEY;
  if (!ApiKey) return res.status(400).json({ error: "provide api key" });
  if (!privateKey)
    return res.status(500).json({ error: "unkown error tryagain later" });

  try {
    const ValidateApiKey = await PlatformsApiKeySchema.findOne({ ApiKey })
      .lean()
      .exec();
    if (!ValidateApiKey)
      return res.status(404).json({ error: "No data found" });
    const decodeApiKey = jwt.verify(ApiKey, privateKey) as decodeApikey;
    const decodePlatformApiKey = jwt.verify(
      ValidateApiKey.ApiKey,
      privateKey
    ) as decodeApikey;
    if (decodeApiKey.apiKey !== decodePlatformApiKey.apiKey)
      return res
        .status(401)
        .json({ error: "you are not authorized to do this action" });

    req.platformID = ValidateApiKey.Platform;
    Next();
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while api key validate msg:${error.message}`);
      return res.status(500).json({ error: "unkown error tryagain later" });
    }
  }
}
