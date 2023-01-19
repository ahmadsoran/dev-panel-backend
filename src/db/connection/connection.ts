import mongoose from "mongoose";

mongoose.Promise = global.Promise;
export function ConnectDB() {
  // Connect MongoDB at default port 27017.
  mongoose.set({ strictQuery: true });
  mongoose.connect("mongodb://localhost:27017/platformDB", {}, (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  });
}
