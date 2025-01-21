import express from "express";
import { createRecord, getAllRecords, getRecordsByProperty, updateRecord } from "../controllers/LoanRecordController";
import { Schemas, ValidateSchema } from "../middlewares/Validation";

const router = express.Router();

router.get('/', getAllRecords);
router.post('/', ValidateSchema(Schemas.loanRecord.create, "body"), createRecord);
router.put('/', ValidateSchema(Schemas.loanRecord.update, "body"), updateRecord);
router.post('/query', ValidateSchema(Schemas.loanRecord.query, "body"), getRecordsByProperty);

export default router;