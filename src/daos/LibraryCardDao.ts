import mongoose, {Document, Schema} from "mongoose";
import { ILibraryCard } from "../models/LibraryCard";

export interface ILibraryCardModel extends ILibraryCard, Document {};

const LibraryCardSchema:Schema = new Schema({
    user : {type:Schema.Types.ObjectId, ref:"User", required:true, unique:true}
});

export default mongoose.model<ILibraryCardModel>("LibraryCard",LibraryCardSchema);