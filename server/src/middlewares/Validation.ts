import Joi, { ObjectSchema } from "joi";

import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";
import { login } from "../services/UserService";
import { IUserModel } from "../daos/UserDao";
import { IBook } from "../models/Book";
import { IBookModel } from "../daos/BookDao";
import { ILibraryCard } from "../models/LibraryCard";
import { ILoanRecord } from "../models/LoanRecord";
import { ILoanRecordModel } from "../daos/LoanRecordDao";

export const ValidateSchema = (schema: ObjectSchema, property: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      switch (property) {
        case "query":
          await schema.validateAsync(req.query);
          break;
        case "params":
          await schema.validateAsync(req.params);
          break;
        default:
          await schema.validateAsync(req.body);
          break;
      }
      next();
    } catch (error) {
      return res
        .status(422)
        .json({ message: "Object validation failed! Pass correct parameters" });
    }
  };
};

export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
      email: Joi.string()
        .regex(/[^@\s\t\r\n]+@[^@\s\t\r\n]+\.[^@\s\t\r\n]+/)
        .required(), // not as expected!!!
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
    }),
    login: Joi.object<{ email: string; password: string }>({
      email: Joi.string()
        .regex(/[^@\s\t\r\n]+@[^@\s\t\r\n]+\.[^@\s\t\r\n]+/)
        .required(),
      password: Joi.string().required(),
    }),
    userId: Joi.object<{ userId: string }>({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    update: Joi.object<IUserModel>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      type: Joi.string().valid("ADMIN", "EMPLOYEE", "PATRON").required(),
      email: Joi.string()
        .regex(/[^@\s\t\r\n]+@[^@\s\t\r\n]+\.[^@\s\t\r\n]+/)
        .required(), // not as expected!!!
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      barcode: Joi.string()
        .regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
        .required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.string().required(),
      publisher: Joi.string().required(),
      pages: Joi.string().required(),
      genre: Joi.string().required(),
    }),
    update: Joi.object<IBookModel>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      barcode: Joi.string()
        .regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
        .required(),
      cover: Joi.string().required(),
      title: Joi.string().required(),
      authors: Joi.array().required(),
      description: Joi.string().required(),
      subjects: Joi.array().required(),
      publicationDate: Joi.string().required(),
      publisher: Joi.string().required(),
      pages: Joi.string().required(),
      genre: Joi.string().required(),
    }),
    delete: Joi.object<{ barcode: string }>({
      barcode: Joi.string()
        .regex(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)
        .required(),
    }),
  },

  libraryCard: {
    create: Joi.object<ILibraryCard>({
      user: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    get: Joi.object<{ cardId: string }>({
      cardId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },

  loanRecord: {
    create: Joi.object<ILoanRecord>({
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      patron: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeOut: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      item: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),

    update: Joi.object<ILoanRecordModel>({
      _id: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      status: Joi.string().valid("AVAILABLE", "LOANED").required(),
      loanedDate: Joi.date().required(),
      dueDate: Joi.date().required(),
      returnedDate: Joi.date(),
      patron: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeOut: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      employeeIn: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      item: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),

    query: Joi.object<{ property: string; value: string | Date }>({
      property: Joi.string()
        .valid(
          "_id",
          "status",
          "loanedDate",
          "dueDate",
          "returnedDate",
          "patron",
          "employeeOut",
          "employeeIn",
          "item"
        )
        .required(),
      value: Joi.alternatives().try(Joi.string(), Joi.date()).required(),
    }),
  },
};
