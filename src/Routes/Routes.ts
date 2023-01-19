import { Router } from "express";
import AuthRoute from "./Auth/SignIn";

const Routes = Router();

Routes.use("/auth", AuthRoute);

export default Routes;
