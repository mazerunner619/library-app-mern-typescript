import mongoose, { Document, Schema } from "mongoose";
import { ILoanRecord } from "../models/LoanRecord";

export interface ILoanRecordModel extends ILoanRecord, Document {};

const LoanRecordSchema = new Schema({
        status: {type:String, required:true},
        loanedDate:{type : Date, required:true},
        dueDate:{type : Date, required:true},
        returnedDate:{type:Date, required: false},
        patron:{type: Schema.Types.ObjectId, required:true},
        employeeOut: {type:Schema.Types.ObjectId, required: true},
        employeeIn:{type:Schema.Types.ObjectId},
        item:{type:Schema.Types.ObjectId, ref:"Book", required: true}
    },
    {
        timestamps:true
    }
);

export default mongoose.model<ILoanRecordModel>("LoanRecord", LoanRecordSchema);