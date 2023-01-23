import mongoose from "mongoose";

mongoose.Promise = global.Promise;
export default async function ConnectDB() {
  // Connect MongoDB at default port 27017.
  mongoose.set({ strictQuery: true });
  mongoose
    .connect("mongodb://localhost:27017/platformDB")
    .then((c) => {
      console.log("connected to DB");
    })
    .catch((e) => {
      console.log("err connect to DB" + e);
    });
}
