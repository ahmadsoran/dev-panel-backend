import { ObjectId } from "mongoose";

export type UserDivice = {
  model: string;
  brand: string;
  CPU: string;
  RAM: string;
  GPU: string;
  UUID: string;
  software_restrictions: "lock" | "unloack";
};

export type UserErrors = {
  times: number;
  priority: "normal" | "urgent" | "critical";
  cause: string;
  status: "crashed" | "others";
  informedBy: ObjectId;
  createdAt: Date;
};

export type User = {
  Device: UserDivice;
  Errors: UserErrors[];
  role: "user" | "dev" | "tester";
  cratedAt: Date;
};
export type platformUsers = {
  _id: string;
  platformID: ObjectId;
  users: User[];
};
