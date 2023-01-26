import { Router } from "express";
import AddAdminUser from "../../controller/dev-panel/AddAdmin";
import SiginIn from "../../controller/dev-panel/Signin";
import { isSuperAdmin } from "../../middlewears/Auth";

const DevPanelRoutes = Router();
// full path /api/{API_VERSION}/dev-panel/{ROUTE}

DevPanelRoutes.post("/add-user", isSuperAdmin, AddAdminUser);
DevPanelRoutes.post("/auth/sign-in", SiginIn);

export default DevPanelRoutes;
