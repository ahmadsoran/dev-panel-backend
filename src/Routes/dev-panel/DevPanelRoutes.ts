import { Router } from "express";
import AddAdminUser from "../../controller/dev-panel/AddAdmin";
import { isSuperAdmin } from "../../middlewears/Auth";

const DevPanelRoutes = Router();
// full path /api/API_VERSION/dev-panel/sign-in

DevPanelRoutes.post("/add-user", isSuperAdmin, AddAdminUser);

export default DevPanelRoutes;
