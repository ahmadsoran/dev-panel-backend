import { Request, Response } from "express";

export default async function isAuthed(req: Request, res: Response) {
  return res.json({ data: "successfuly" });
}
