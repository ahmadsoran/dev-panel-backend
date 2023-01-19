import { ObjectId } from "mongoose";

export type pre_release_V_Type = {
  numberOFerrors: number;
  numberOFcrashes: number;
  tested_by: ObjectId[];
  isReadyForRealse: boolean;
};

export type PlatformBuild = {
  release_version: string;
  pre_realseversion: pre_release_V_Type;
};
