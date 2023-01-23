import { Router } from "express";
import AddPlatform from "../../controller/Platform/AddPlatform";
import AddUser from "../../controller/Platform/AddUser";
import GenApiKeyForPlatforms from "../../controller/Platform/Gen-apikey";
import { isAdmin, isApiKeyValid, isSuperAdmin } from "../../middlewears/Auth";

const PlatformRoutes = Router();
// full path /api/API_VERSION/platform/*

PlatformRoutes.post("/add", isAdmin, AddPlatform);
PlatformRoutes.post("/gen-apikey", isSuperAdmin, GenApiKeyForPlatforms);
PlatformRoutes.post("/user/add", isApiKeyValid, AddUser);

export default PlatformRoutes;
