import { Router } from "express";
import AuthRoute from "./Auth/Auth";
import DevPanelRoutes from "./dev-panel/DevPanelRoutes";
import PlatformRoutes from "./Platform/PlatformRoutes";

const Routes = Router();

Routes.use("/auth", AuthRoute);
Routes.use("/dev-panel", DevPanelRoutes);
Routes.use("/platform", PlatformRoutes);

export default Routes;
