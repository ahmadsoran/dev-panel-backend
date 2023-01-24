import { UserErrors } from "./User";

export type SiginInData = {
  username: string;
  password: string;
};

export interface AddErrorsData extends UserErrors {
  DeviceUUID: string;
}
