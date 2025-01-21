import mongoose, { Schema, Document } from "mongoose";
import { IBook } from "../models/Book";

export interface IBookModel extends IBook, Document {}

const BookSchema = new Schema({
  barcode: { type: String, required: true, unique: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  description: { type: String, required: true },
  subjects: { type: [String], required: true },
  publicationDate: { type: String },
  publisher: { type: String, required: true },
  pages: { type: String, required: true },
  genre: { type: String, required: true },
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: "LoanRecord",
    },
  ],
  status: { type: String },
});

export default mongoose.model<IBookModel>("Book", BookSchema);
