import { ObjectId } from "mongoose";

export type PlatformApiKey = {
  _id: string;
  Platform: ObjectId;
  ApiKey: string;
};
