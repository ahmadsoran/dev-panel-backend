import { Router } from "express";
import DevPanelRoutes from "./dev-panel/DevPanelRoutes";
import PlatformRoutes from "./Platform/PlatformRoutes";

const Routes = Router();

Routes.use("/dev-panel", DevPanelRoutes);
Routes.use("/platform", PlatformRoutes);

export default Routes;
