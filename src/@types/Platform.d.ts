import { ObjectId } from "mongoose";
import { PlatformBuild } from "./PlatformBuild";

export type PlatformOwner = {
  name: string;
  phone_number: string;
  email: string;
};

export default interface PlatformsType {
  name: string;
  NumberOFusers: number;
  NumberOFerrors: number;
  numberOFcrashes: number;
  lastCrashReport: Date;
  lastErrorReport: Date;
  owner: PlatformOwner;
  platformType: "android" | "ios" | "Both";
  releaseVersion: string;
  isNewUpdateAvailable: boolean;
  build: PlatformBuild;
  createdAt: Date;
  UpdatedAt: Date;
}
