import { Request, Response } from "express";
import SignInDataValidation from "../../Validations/SignIn";
import bcrypt from "bcrypt";
import AdminAccountSchema from "../../db/model/Dev-PanelSchema/AdminAccountSchema";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import winston from "winston";

export default async function SiginIn(req: Request, res: Response) {
  const { username, password } = req.body;
  const prvKey = process.env.PRV_KEY;
  try {
    try {
      await SignInDataValidation.validateAsync({ username, password });
    } catch (error) {
      if (error instanceof Error) return res.status(400).json(error.message);
    }
    ///
    const AdminData = await AdminAccountSchema.findOne({
      username,
    })
      .lean()
      .exec();
    ///
    if (!AdminData) return res.status(404).send("User not found!");
    const isPasswordVaild = await bcrypt.compare(password, AdminData?.password);
    ///
    if (!isPasswordVaild)
      return res.status(400).send("password or username invaild");
    if (!prvKey) return res.status(500).send("something went wrong!");

    const token = jwt.sign({ id: AdminData?._id.toString() }, prvKey, {
      expiresIn: "10h",
    });
    res.cookie("token", token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      expires: dayjs(Date.now()).add(10, "h").toDate(),
    });

    return res.json("Signed in");
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while user try sign-in msg:${error.message}`);
      console.log(error);
      return res
        .status(500)
        .send("unkown error happen while sgin in try again");
    }
  }
}
