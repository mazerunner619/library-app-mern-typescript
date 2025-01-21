import express, { Express, Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import mongoose from "mongoose";
import { registerRoutes } from "./routes";
import path from "path";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: config.server.origin,
  })
);

app.use(express.static(path.resolve(__dirname, "../build")));

registerRoutes(app);

app.get("*", (req: any, res: any) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

export const connectDataBase = async () => {
  try {
    await mongoose.connect(config.mongo.mongo_uri, {
      w: "majority",
      retryWrites: true,
      authMechanism: "DEFAULT",
    });
    console.log("mongoDB connected!");
  } catch (error) {
    console.log("db connection issue: ", error);
  }
};

export default app;
