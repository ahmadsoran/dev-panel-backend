import { model, Schema } from "mongoose";
import { pre_release_V_Type } from "../../../@types/PlatformBuild";

const BuildPreRelease = new Schema<pre_release_V_Type>(
  {
    isReadyForRealse: false,
    numberOFcrashes: 0,
    numberOFerrors: 0,
    tested_by: {
      type: [Schema.Types.ObjectId],
      ref: "users",
    },
  },
  { timestamps: true }
);

const BuildPreReleaseSchema = model("pre-release", BuildPreRelease);

export default BuildPreReleaseSchema;
