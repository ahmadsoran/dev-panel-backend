import { NextFunction, Request, Response } from "express";
import winston from "winston";
import jwt from "jsonwebtoken";
import AdminAccountSchema from "../db/model/AdminAccountSchema";
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
