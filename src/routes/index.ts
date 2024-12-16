import { Express, Request, Response } from "express";

import authRoutes from "./AuthRoutes";
import userRoutes from "./UserRoutes";
import bookRoutes from "./BookRoutes";
import libraryCardRoutes from "./LibraryCardRoutes";
import loanRecordRoutes from "./LoanRecordRoutes";
import BookDao from "../daos/BookDao";
import LoanRecordDao from "../daos/LoanRecordDao";
import LibraryCardDao from "../daos/LibraryCardDao";

export const registerRoutes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "server running properly" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/book", bookRoutes);
  app.use("/api/card", libraryCardRoutes);
  app.use("/api/record", loanRecordRoutes);

  app.get("/clear-all", async (_: Request, res: Response) => {
    let a = await LoanRecordDao.deleteMany();
    let b = await BookDao.updateMany(
      {},
      { $set: { records: [], status: "AVAILABLE" } }
    );
    let c = await LibraryCardDao.deleteMany();
    res.json({ a, b, c });
  });

  app.get("/api/book-of-the-week", async (req: Request, res: Response) => {
    let result = await BookDao.aggregate([
      {
        $addFields: {
          recordCount: { $size: "$records" },
        },
      },
      {
        $sort: {
          recordCount: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    let lastIndexWithAboveCount = result.findIndex(
      (rec: any) => rec.recordCount < result[0].recordCount
    );
    if (lastIndexWithAboveCount === -1) lastIndexWithAboveCount = result.length;
    let randomIndex = Math.floor(Math.random() * lastIndexWithAboveCount);
    res.json(result[randomIndex]);
  });
};
