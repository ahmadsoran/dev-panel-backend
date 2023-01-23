import { Router } from "express";
import AddPlatform from "../../controller/Platform/AddPlatform";
import GenApiKeyForPlatforms from "../../controller/Platform/Gen-apikey";
import { isAdmin, isSuperAdmin } from "../../middlewears/Auth";

const PlatformRoutes = Router();
// full path /api/API_VERSION/platform/*

PlatformRoutes.post("/add", isAdmin, AddPlatform);
PlatformRoutes.post("/gen-apikey", isSuperAdmin, GenApiKeyForPlatforms);

export default PlatformRoutes;
