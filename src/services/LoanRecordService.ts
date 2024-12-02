import BookDao from "../daos/BookDao";
import LoanRecordDao, { ILoanRecordModel } from "../daos/LoanRecordDao";
import { ILoanRecord } from "../models/LoanRecord";
import {
  BookAlreadyLoanedError,
  BookDoesNotExistError,
  LoanRecordNotExistError,
} from "../utils/LibraryErrors";
import { findBookById } from "./BookService";

export const generateRecord = async (
  record: ILoanRecord
): Promise<ILoanRecordModel> => {
  try {
    const book = await findBookById(record.item);
    if (!book)
      throw new BookDoesNotExistError("book does not exist in library");
    if (book.status === "LOANED")
      throw new BookAlreadyLoanedError("book is already loaned to someone");
    const newRecord: ILoanRecordModel = await LoanRecordDao.create(record);
    book.records.unshift(`${newRecord._id}`);
    book.status = "LOANED";
    await book.save();
    return newRecord;
  } catch (error: any) {
    throw error;
  }
};

export const modifyRecord = async (
  record: ILoanRecordModel
): Promise<ILoanRecordModel> => {
  try {
    const { _id, ...updateFields } = record;
    const updatedRecord = await LoanRecordDao.findOneAndUpdate(
      { _id },
      { $set: { ...updateFields } },
      { new: true }
    );
    const result = await BookDao.findOneAndUpdate(
      { _id: record.item },
      { $set: { status: record.status } }
    );
    if (updatedRecord) return updatedRecord;
    throw new LoanRecordNotExistError("loan record does not exist");
  } catch (error: any) {
    throw error;
  }
};

export const findAllRecords = async (): Promise<ILoanRecordModel[]> => {
  try {
    return await LoanRecordDao.find();
  } catch (error: any) {
    throw error;
  }
};

export const queryRecords = async (param: {
  property: string;
  value: string | Date;
}): Promise<ILoanRecordModel[]> => {
  try {
    return await LoanRecordDao.find({ [param.property]: param.value })
      .sort("-loanedDate")
      .populate({ path: "item", select: "title" });
  } catch (error: any) {
    throw error;
  }
};
