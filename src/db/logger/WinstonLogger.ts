import winston from "winston";
import "winston-mongodb";
export default function WinstonLogger(lvl: "error" | "info", name: string) {
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/platformDB",
      level: lvl,
      name,
      capped: true,
      cappedMax: 10000,
      collection: "logs",
      options: {
        useUnifiedTopology: true,
      },
    })
  );
}
