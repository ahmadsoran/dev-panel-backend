export type AdminAccountDataType = {
  _id: string;
  name: string;
  createdAt: Date;
  role: "admin" | "superadmin";
  username: string;
  password: string;
  device_udid: string;
};
