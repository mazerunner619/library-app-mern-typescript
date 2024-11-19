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
registerRoutes(app);

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

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../client", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

export default app;
