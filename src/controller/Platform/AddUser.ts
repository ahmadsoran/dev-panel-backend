import { Request, Response } from "express";
import winston from "winston";

export default async function AddUser(req: Request, res: Response) {
  try {
    try {
    } catch (error) {}
  } catch (error) {
    if (error instanceof Error) {
      winston.error(
        `error while adding user to platform msg: ${error.message}`
      );
      return res.status(500).send("unkown error happend");
    }
  }
}
