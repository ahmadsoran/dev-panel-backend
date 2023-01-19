import { Router } from "express";
import SiginIn from "../../controller/Auth/Signin";

const AuthRoute = Router();
// full path /api/auth/sign-in

AuthRoute.post("/sign-in", SiginIn);

export default AuthRoute;
