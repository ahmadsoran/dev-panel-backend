import { NextFunction, Request, Response } from "express";
import winston from "winston";
import PlatformSchema from "../../db/model/PlatformSchema/Platform";

export async function GetPlatforms(req: Request, res: Response) {
  const { page, row, sort } = req.query;
  const resultsPerPage =
    parseInt(row as string) >= 1 ? parseInt(row as string) : 25;
  let pages = parseInt(page as string) >= 1 ? parseInt(page as string) - 1 : 0;
  try {
    const platforms = await PlatformSchema.find()
      .sort(`${sort ? "-createdAt" : "createdAt"}`)
      .limit(resultsPerPage)
      .skip(resultsPerPage * pages);
    const TotalPlatformsNumber = await PlatformSchema.countDocuments().exec();
    return res.json({
      resault: TotalPlatformsNumber,
      platforms,
    });
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while geting platforms data msg: ${error.message}`);
      return res.status(500).send("unkown error happen");
    }
  }
}

export async function GetPlatformByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  if (!id) return res.status(400).send("id must require");
  try {
    const platform = await PlatformSchema.findById(id);
    if (!platform) return res.status(404).send("no data found!");
    req.platfomData = platform;
    next();
  } catch (error) {
    if (error instanceof Error) {
      winston.error(`error while geting platforms data msg: ${error.message}`);
      return res.status(500).send("unkown error happen");
    }
  }
}
