import { ILoanRecordModel } from "../../daos/LoanRecordDao";
import { ILoanRecord } from "../../models/LoanRecord";
import { findBookById } from "../../services/BookService";
import {
  findAllRecords,
  generateRecord,
  modifyRecord,
  queryRecords,
} from "../../services/LoanRecordService";
import { findUserById } from "../../services/UserService";
import { commonError } from "../graphql";

export const createRecord = async (parent: {}, args: { body: ILoanRecord }) => {
  let { body } = args;
  try {
    const newRecord = await generateRecord(body);
    return newRecord;
  } catch (error) {
    console.log(error);

    //   if (error instanceof BookAlreadyLoanedError)
    //   else if (error instanceof BookDoesNotExistError)
    throw commonError;
  }
};

export const updateRecord = async (
  parent: {},
  args: { body: ILoanRecordModel }
) => {
  let { body } = args;
  try {
    const updatedRecord = await modifyRecord(body);
    return updatedRecord;
  } catch (error) {
    //   if (error instanceof LoanRecordNotExistError)
    throw commonError;
  }
};

export const getAllRecords = async () => {
  try {
    const records = await findAllRecords();
    return records;
  } catch (error) {
    throw commonError;
  }
};

export const getRecordsByProperty = async (
  parent: {},
  args: {
    body: {
      property: string;
      value: string | Date;
    };
  }
) => {
  const { body } = args;
  try {
    const records = await queryRecords(body);
    return records;
  } catch (error) {
    throw commonError;
  }
};

export const fetchItemForLoanRecord = async (parent: ILoanRecord) => {
  console.log("looking for item");
  return await findBookById(parent.item);
};

export const fetchUserForLoanRecord = async (
  parent: ILoanRecord,
  userType: "PATRON" | "EMPLOYEE_IN" | "EMPLOYEE_OUT"
) => {
  console.log("looking for item");
  if (userType === "PATRON") return await findUserById(parent.patron);
  else if (userType === "EMPLOYEE_IN" && parent.employeeIn)
    return await findUserById(parent.employeeIn);
  else if (userType === "EMPLOYEE_OUT")
    return await findUserById(parent.employeeOut);
  return undefined;
};
