import { Router } from "express";
import AddAdminUser from "../../controller/dev-panel/AddAdmin";
import isAuthed from "../../controller/dev-panel/Auth";
import SiginIn from "../../controller/dev-panel/Signin";
import { isAdmin, isSuperAdmin } from "../../middlewears/Auth";

const DevPanelRoutes = Router();
// full path /api/{API_VERSION}/dev-panel/{ROUTE}

DevPanelRoutes.post("/add-user", isSuperAdmin, AddAdminUser);
DevPanelRoutes.post("/auth/sign-in", SiginIn);
DevPanelRoutes.get("/auth", isAdmin, isAuthed);

export default DevPanelRoutes;
