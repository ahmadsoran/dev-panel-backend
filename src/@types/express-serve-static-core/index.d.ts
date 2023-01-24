import PlatformsType from "../Platform";

declare global {
  namespace Express {
    interface Request {
      AdminID?: string;
      platformID?: unknown;
      platfomData: PlatformsType;
    }
  }
}
