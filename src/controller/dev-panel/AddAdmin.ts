import { Request, Response } from "express";
import winston from "winston";
import AdminAccountSchema from "../../db/model/Dev-PanelSchema/AdminAccountSchema";
import AddAdminUserValidation from "../../Validations/Add-AdminUser";
import { genSalt, hash } from "bcrypt";
export default async function AddAdminUser(req: Request, res: Response) {
  const { name, role, username, password } = req.body;
  const saltRound = 11;
  try {
    try {
      await AddAdminUserValidation.validateAsync({
        name,
        role,
        username,
        password,
      });
    } catch (error) {
      if (error instanceof Error) return res.status(400).send(error.message);
    }
    const GenSalt = await genSalt(saltRound, "a");
    const isUsernameAvailable = await AdminAccountSchema.findOne({ username })
      .lean()
      .exec();
    if (isUsernameAvailable)
      return res.status(400).send("this username is taken");
    const HashedPassword = await hash(password, GenSalt);
    const createAdminUser = new AdminAccountSchema({
      name,
      role,
      password: HashedPassword,
      username,
    });
    await createAdminUser.save();
    return res.json({
      user: `${name} created successfully`,
    });
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while adding use msg: ${error.message}`);
      return res.status(500).send("unknown error happened");
    }
  }
}
