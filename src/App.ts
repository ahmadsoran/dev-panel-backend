import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./db/connection/connection";
import dotenv from "dotenv";
import helmet from "helmet";
import Routes from "./Routes/Routes";
import Api from "./util/Api";
import WinstonLogger from "./db/logger/WinstonLogger";
dotenv.config();
const app: Express = express();
const ENV = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

StartServer();
async function StartServer() {
  ConnectDB();
  app.use(helmet());
  app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
  app.use(cookieParser());
  app.use(`${Api.RootRoute}/${Api.Version}`, Routes);
  app.use("/data", express.static(`${__dirname}/public`));
  WinstonLogger("error", "errors");
  app.listen(ENV.PORT, () => {
    console.log(`app listing on ${ENV.PORT}`);
  });
}
