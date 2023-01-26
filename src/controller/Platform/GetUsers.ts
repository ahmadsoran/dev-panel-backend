import { Request, Response } from "express";
import winston from "winston";
import { User, UserErrors } from "../../@types/User";
import UsersSchema from "../../db/model/PlatformSchema/Users";
type Queries = {
  page: string;
  row: string;
  search: string;
  date: "old" | "new";
  errorsPriority: UserErrors["priority"];
  errorsType: UserErrors["status"];
  searchBy: "model" | "UUID" | "brand";
  role: User["role"];
};

export async function GetUsersOfPlatform(req: Request, res: Response) {
  const {
    page,
    row,
    search,
    date,
    errorsPriority,
    errorsType,
    searchBy,
    role,
  } = req.query as Queries;

  if (!req.platfomData._id) return res.status(400).send("invaild platform id");
  const resultsPerPage =
    parseInt(row as string) >= 1 ? parseInt(row as string) : 1;
  let pages = parseInt(page as string) >= 1 ? parseInt(page as string) - 1 : 0;

  const isSearchFilterAvailable = search && searchBy ? true : false;

  try {
    const users = await UsersSchema.find({
      platform: req.platfomData._id,
      role: role ? role : "user",
    })
      .populate({
        path: "Errors",
        model: "user-errors",
        select: "priority , status",
        options: {
          lean: true,
        },
      })
      .sort(date === "new" ? "-createdAt" : "createdAt")
      .lean()
      .exec();

    const FilterUsers = users
      .filter((data) => {
        if (isSearchFilterAvailable) {
          if (searchBy === "model") return data.Device.model.includes(search);
          else if (searchBy === "UUID")
            return data.Device.UUID.includes(search);
          else if (searchBy === "brand")
            return data.Device.brand.includes(search);
        } else return data;
      })
      .sort((a, b) => {
        if (errorsPriority)
          return (
            b.Errors.filter((data) => data.priority === errorsPriority).length -
            a.Errors.filter((data) => data.priority === errorsPriority).length
          );
        else
          return (
            a.Errors.filter((data) => data.priority === errorsPriority).length -
            b.Errors.filter((data) => data.priority === errorsPriority).length
          );
      })
      .sort((a, b) => {
        if (errorsType)
          return (
            b.Errors.filter((data) => data.status === errorsType).length -
            a.Errors.filter((data) => data.status === errorsType).length
          );
        else
          return (
            a.Errors.filter((data) => data.status === errorsType).length -
            b.Errors.filter((data) => data.status === errorsType).length
          );
      })
      .slice(pages * resultsPerPage, pages * resultsPerPage + resultsPerPage);
    return res.json({
      total_users_num: users.length,
      platform: req.platfomData,
      users: {
        resault: FilterUsers.length,
        data: FilterUsers,
      },
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
