import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConnectDB } from "./db/connection/connection";
import dotenv from "dotenv";
import helmet from "helmet";
import Routes from "./Routes/Routes";
import Api from "./util/Api";
dotenv.config();
const app: Express = express();
const ENV = process.env;

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/data", express.static(`${__dirname}/public`));

StartServer();
async function StartServer() {
  ConnectDB();
  app.use(`${Api.RootRoute}/${Api.Version}`, Routes);
  app.listen(ENV.PORT, () => {
    console.log(`app listing on ${ENV.PORT}`);
  });
}
