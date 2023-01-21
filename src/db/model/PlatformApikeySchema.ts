import { model, Schema } from "mongoose";
import { PlatformApiKey } from "../../@types/Platform-apikey";

const PlatformApiKey = new Schema<PlatformApiKey>({
  ApiKey: String,
  Platform: {
    type: Schema.Types.ObjectId,
    ref: "platforms",
  },
});

const PlatformsApiKeySchema = model("platform-apikey", PlatformApiKey);

export default PlatformsApiKeySchema;
