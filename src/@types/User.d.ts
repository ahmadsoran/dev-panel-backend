import { ObjectId } from "mongoose";

export type UserDivice = {
  model: string;
  brand: string;
  CPU: string;
  RAM: string;
  GPU: string;
  UUID: string;
  software_restrictions: "lock" | "unloack";
  version: string;
};

export type UserErrors = {
  _id: string;
  times: number;
  priority: "normal" | "urgent" | "critical";
  cause: string;
  status: "crashed" | "others";
  informedBy: ObjectId;
  createdAt: Date;
};

export type User = {
  _id: string;
  Device: UserDivice;
  Errors: UserErrors[];
  role: "user" | "dev" | "tester";
  cratedAt: Date;
  platform: ObjectId;
};
