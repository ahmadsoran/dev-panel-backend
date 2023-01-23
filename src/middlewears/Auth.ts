import { NextFunction, Request, Response } from "express";
import winston from "winston";
import jwt from "jsonwebtoken";
import AdminAccountSchema from "../db/model/Dev-PanelSchema/AdminAccountSchema";
import PlatformsApiKeySchema from "../db/model/PlatformSchema/Apikey";
type decodedToken = {
  id: string;
};
export async function isAdmin(req: Request, res: Response, Next: NextFunction) {
  const token: string = req.cookies?.token || "";
  const privateKey = process.env.PRV_KEY;
  try {
    if (!privateKey) {
      winston.error("private key is undifined");
      return res.status(500).send("unkown error happen try again later");
    }
    if (!token)
      return res.status(401).send("un authorized please sign in first");
    const VerifiedToken: decodedToken = jwt.verify(
      token,
      privateKey
    ) as decodedToken;

    const AdminUser = await AdminAccountSchema.findById(VerifiedToken?.id);
    if (!VerifiedToken?.id)
      return res.status(401).send("you are not authorized to do this action");

    if (AdminUser?.role === "admin" || AdminUser?.role === "superadmin") {
      req.AdminID = AdminUser?._id;
      return Next();
    }
    return res.status(401).send("you are not authorized to do this action");
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while authenticate admin msg:${error.message}`);
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
  const token = req.cookies.token;
  const privateKey = process.env.PRV_KEY;

  try {
    if (!privateKey) {
      winston.error("private key is undifined");
      return res.status(500).send("unkown error happen try again later");
    }
    if (!token)
      return res.status(401).send("un authorized please sign in first");

    const VerifiedToken: decodedToken = jwt.verify(
      token,
      privateKey
    ) as decodedToken;
    if (!VerifiedToken?.id)
      return res.status(401).send("you are not authorized to do this action");

    const AdminUser = await AdminAccountSchema.findById(VerifiedToken?.id);
    if (AdminUser?.role === "superadmin") {
      req.AdminID = AdminUser?._id;
      return Next();
    }
    return res.status(401).send("you are not authorized to do this action");
  } catch (error) {
    if (error instanceof Error) {
      winston.error(
        `error while authenticate super admin msg:${error.message}`
      );
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
  const privateKey = process.env.PRV_KEY;
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
