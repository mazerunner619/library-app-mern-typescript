import { Express, Request, Response } from "express";

import authRoutes from "./AuthRoutes";
import userRoutes from "./UserRoutes";
import bookRoutes from "./BookRoutes";
import libraryCardRoutes from "./LibraryCardRoutes";
import loanRecordRoutes from "./LoanRecordRoutes";

export const registerRoutes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "server running properly" });
  });
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/book", bookRoutes);
  app.use("/api/card", libraryCardRoutes);
  app.use("/api/record", loanRecordRoutes);
};
