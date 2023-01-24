import { Request, Response } from "express";
import winston from "winston";
import { UserErrors } from "../../@types/User";
import UsersSchema from "../../db/model/PlatformSchema/Users";
type Queries = {
  page: string;
  row: string;
  search: string;
  words: "asc" | "desc";
  date: "old" | "new";
  errors: UserErrors["priority"];
  os: "all" | "android" | "ios";
};

export async function GetUsersOfPlatform(req: Request, res: Response) {
  const { page, row, search, date, errors, os, words } = req.query as Queries;

  if (!req.platfomData._id) return res.status(400).send("invaild platform id");
  const resultsPerPage =
    parseInt(row as string) >= 1 ? parseInt(row as string) : 25;
  let pages = parseInt(page as string) >= 1 ? parseInt(page as string) - 1 : 0;

  try {
    const users = await UsersSchema.find({
      platform: req.platfomData._id,
    });

    return res.json({
      platform: req.platfomData,
      users,
    });
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while geting users data msg: ${error.message}`);
      return res.status(500).send("unkown error happen" + error);
    }
  }
}

// export async function GetPlatformByID(req: Request, res: Response) {
//   const { id } = req.params;
//   if (!id) return res.status(400).send("id must require");
//   try {
//     const platform = await UsersSchema.findById(id);
//     if (!platform) return res.status(404).send("no data found!");
//     return res.json({
//       platform,
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       winston.error(`error while geting users data msg: ${error.message}`);
//       return res.status(500).send("unkown error happen");
//     }
//   }
// }
