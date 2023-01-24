import { Router } from "express";
import addUserErrors from "../../controller/Platform/AddErrors";
import AddPlatform from "../../controller/Platform/AddPlatform";
import AddUser from "../../controller/Platform/AddUser";
import GenApiKeyForPlatforms from "../../controller/Platform/Gen-apikey";
import {
  GetPlatformByID,
  GetPlatforms,
} from "../../controller/Platform/GetPlatforms";
import { GetUsersOfPlatform } from "../../controller/Platform/GetUsers";
import { isAdmin, isApiKeyValid, isSuperAdmin } from "../../middlewears/Auth";

const PlatformRoutes = Router();
// full path /api/API_VERSION/platform/*

PlatformRoutes.get("/", isAdmin, GetPlatforms);
PlatformRoutes.get("/id/:id", isAdmin, GetPlatformByID, GetUsersOfPlatform);
PlatformRoutes.post("/add", isAdmin, AddPlatform);
PlatformRoutes.post("/gen-apikey", isSuperAdmin, GenApiKeyForPlatforms);
PlatformRoutes.post("/user/add", isApiKeyValid, AddUser);
PlatformRoutes.post("/user/errors/add", isApiKeyValid, addUserErrors);

export default PlatformRoutes;
