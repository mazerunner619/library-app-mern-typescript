import { Request, Response } from "express";
import {
  findAllRecords,
  generateRecord,
  modifyRecord,
  queryRecords,
} from "../services/LoanRecordService";
import {
  BookAlreadyLoanedError,
  BookDoesNotExistError,
  LoanRecordNotExistError,
} from "../utils/LibraryErrors";
import LoanRecordDao from "../daos/LoanRecordDao";

export const createRecord = async (req: Request, res: Response) => {
  let record = req.body;
  try {
    const newRecord = await generateRecord(record);
    res
      .status(200)
      .json({ message: "created new loan record", record: newRecord });
  } catch (error) {
    if (error instanceof BookAlreadyLoanedError)
      res.status(409).json({ message: "cannot loan an already loaned book" });
    else if (error instanceof BookDoesNotExistError)
      res.status(404).json({ message: "could not find the book" });
    else
      res
        .status(500)
        .json({ message: "could not create new loan record", error: error });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  let record = req.body;
  try {
    const updatedRecord = await modifyRecord(record);
    res
      .status(200)
      .json({ message: "updated the loan record", record: updatedRecord });
  } catch (error) {
    if (error instanceof LoanRecordNotExistError)
      res
        .status(404)
        .json({ message: "loan record does not exist", error: error });
    res
      .status(500)
      .json({ message: "could not update loan record", error: error });
  }
};

export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await findAllRecords();
    res.status(200).json({ message: "fetched all loan records", records });
  } catch (error) {
    res
      .status(500)
      .json({ message: "could not update loan record", error: error });
  }
};

export const getRecordsByProperty = async (req: Request, res: Response) => {
  const param = req.body;
  try {
    const records = await queryRecords(param);
    res.status(200).json({ message: "fetched all loan records", records });
  } catch (error) {
    res
      .status(500)
      .json({ message: "could not update loan record", error: error });
  }
};
